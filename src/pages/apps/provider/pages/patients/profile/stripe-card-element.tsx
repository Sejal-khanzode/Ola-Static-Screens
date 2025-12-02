import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Grid, Alert, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import { StripeControllerService } from 'src/sdk/requests';
import { useMutation } from '@tanstack/react-query';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useDispatch } from 'react-redux';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { getGlobalRefetchPaymentCardsFunction } from './payment-cards-subtab';
import { useStripeAccount } from 'src/components/stripe/SimpleStripeProvider';

interface StripeCardElementProps {
  onClose: () => void;
  patientId?: string;
}

const StripeCardElement: React.FC<StripeCardElementProps> = ({ onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const patientUuid = getDataFromLocalStorage('patientUUID');
  const dispatch = useDispatch();
  const { hasStripeAccount } = useStripeAccount();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDefault, setIsDefault] = useState<boolean>(true);

  const {
    mutateAsync: createRequest,
    isSuccess,
    isPending,
    isError,
    error: errorCreateCard,
    data,
  } = useMutation({
    mutationFn: (payload: any) =>
      StripeControllerService.postApiMasterStripePaymentMethod({
        requestBody: payload,
      }),
  });
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet. Please try again.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Card element not found.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Create payment method with CardElement
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: 'Customer Name',
        },
      });

      if (error) {
        console.error('❌ Stripe error:', error);
        setError(error.message || 'An error occurred while processing your card.');
      } else if (paymentMethod) {
        // Call API to save payment method as soon as we get the payment method ID
        if (!patientUuid) {
          console.error('❌ Patient UUID not found');
          setError('Patient information not found. Please try again.');
          return;
        }

        try {
          await createRequest({
            patientClinicUuid: patientUuid,
            paymentMethodKey: paymentMethod?.id,
            default: isDefault,
          });

          // Refetch payment cards list
          const refetchCards = getGlobalRefetchPaymentCardsFunction();
          if (refetchCards) {
            refetchCards();
          }
        } catch (apiError) {
           console.error('❌ Error saving payment method to backend:', apiError);
          // setError('Payment method created but failed to save. Please try again.');
          return;
        }

        // Auto-close after showing success for 3 seconds
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (err) {
      console.error('❌ Error during payment method creation:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  useApiFeedback(
    isError,
    errorCreateCard,
    isSuccess,
    (data?.message || 'Added Successfully') as string
  );

  useEffect(() => {
    if (isPending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isPending, dispatch]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {!hasStripeAccount && (
          <Grid size={12}>
            <Alert severity="error">
              Clinic is not linked to Stripe. Please contact your administrator to set up Stripe integration before adding payment methods.
            </Alert>
          </Grid>
        )}

        {error && (
          <Grid size={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}

        <Grid size={12}>
          <CustomLabel label="Card Information" isRequired />
          <Box
            sx={{
              border: '1px solid #ddd',
              borderRadius: '4px',
              p: 2,
              mt: 1,
              opacity: hasStripeAccount ? 1 : 0.5,
              pointerEvents: hasStripeAccount ? 'auto' : 'none',
              '& .StripeElement': {
                padding: '10px',
              },
              '& .StripeElement--focus': {
                borderColor: '#1976d2',
              },
              '& .StripeElement--invalid': {
                borderColor: '#d32f2f',
              },
            }}
          >
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
                disabled: !hasStripeAccount,
              }}
            />
          </Box>
        </Grid>
        <Grid size={12}>
          <CustomLabel label="Set as Primary" />
          <RadioGroup
            row
            value={isDefault.toString()}
            onChange={e => setIsDefault(e.target.value === 'true')}
            sx={{ mt: 1 }}
          >
            <FormControlLabel
              value="true"
              control={
                <Radio
                  sx={{
                    color: 'Primary.main',
                    '&.Mui-checked': {
                      color: 'Primary.main',
                    },
                    fontSize: '12px',
                  }}
                  size="small"
                  disabled={!hasStripeAccount}
                />
              }
              label="Yes"
              disabled={!hasStripeAccount}
            />
            <FormControlLabel
              value="false"
              control={
                <Radio
                  sx={{
                    fontSize: '12px',
                    color: 'Primary.main',
                    '&.Mui-checked': {
                      color: 'Primary.main',
                    },
                  }}
                  size="small"
                  disabled={!hasStripeAccount}
                />
              }
              label="No"
              disabled={!hasStripeAccount}
            />
          </RadioGroup>
        </Grid>

        <Grid size={12} mt={3}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <CustomButton
              variant="outlined"
              onClick={onClose}
              disabled={isProcessing}
              label="Cancel"
            />
            <CustomButton
              variant="filled"
              type="submit"
              disabled={!stripe || isProcessing || !hasStripeAccount}
              label={isProcessing ? 'Processing...' : 'Save'}
            />
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default StripeCardElement;
