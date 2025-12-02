import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography, Link, Stack } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomButton from '../reusable/custom-button/custom-button';
import { EnterOtpSchema } from '../../../schema/auth-schema/auth-schema';
import { loginConstants } from '../../../constants/auth-constants';
import styled from 'styled-components';
import {
  AuthControllerService,
  OtpVerificationRequest,
  UserControllerService,
} from 'src/sdk/requests';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { showLoader, hideLoader } from '../../../redux/reducers/loaderReducer';
import useApiFeedback from 'src/hooks/useApiFeedback';

const StyledOtpInput = styled.div`
  & .MuiInputBase-root {
    border-radius: 0.5rem;
    width: 70px;
    height: 60px;
  }
  & .MuiInputBase-input {
    border-radius: 0.5rem;
    font-size: 1.25rem;
    text-align: center;
    padding: 0;
  }
  & .MuiOutlinedInput-notchedOutline {
    border-radius: 0.5rem;
  }
`;

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length: number;
  gap: number;
  maxWidth: string;
  error?: string;
}

const OtpInput = ({ value, onChange, length, gap, maxWidth, error }: OtpInputProps) => {
  const MuiOtpInputComponent = MuiOtpInput as any;
  return (
    <StyledOtpInput>
      <MuiOtpInputComponent
        value={value}
        onChange={onChange}
        length={length}
        gap={gap}
        maxWidth={maxWidth}
      />
      {error && (
        <Typography variant="bodyBold4" color="error" mt={1}>
          {error}
        </Typography>
      )}
    </StyledOtpInput>
  );
};

const EnterOtp = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(0);
  const [_, setOtpMessage] = useState(false);
  const location = useLocation();
  const isForgot = location?.state?.isForgot;

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<OtpVerificationRequest>({
    resolver: yupResolver(EnterOtpSchema),
    defaultValues: {
      otp: '',
      username: username || '',
    },
  });

  const {
    mutateAsync: verifyOtp,
    data: verifyData,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: AuthControllerService.postApiMasterAuthVerifyOtp,
  });

  const {
    mutateAsync: sendOtp,
    isPending: isSendPending,
    isSuccess: isSendSuccess,
    isError: isSendError,
    error: sendError,
  } = useMutation({
    mutationFn: UserControllerService.postApiMasterSetResetPasswordByLinkType,
  });

  // Initialize timer from localStorage or set to 60
  useEffect(() => {
    const savedTimer = localStorage.getItem(`otp_timer_${username}`);
    if (savedTimer) {
      const remainingTime =
        parseInt(savedTimer) -
        Math.floor(
          (Date.now() - parseInt(localStorage.getItem(`otp_timer_start_${username}`) || '0')) / 1000
        );
      setTimer(Math.max(0, remainingTime));
    } else {
      setTimer(60);
      localStorage.setItem(`otp_timer_${username}`, '60');
      localStorage.setItem(`otp_timer_start_${username}`, Date.now().toString());
    }
  }, [username]);

  // Update timer every second
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => {
          const newTime = prev - 1;
          localStorage.setItem(`otp_timer_${username}`, newTime.toString());
          return newTime;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, username]);

  // Clear timer when it reaches 0
  useEffect(() => {
    if (timer === 0) {
      localStorage.removeItem(`otp_timer_${username}`);
      localStorage.removeItem(`otp_timer_start_${username}`);
    }
  }, [timer, username]);

  useEffect(() => {
    if (isPending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isPending, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem(`otp_timer_${username}`);
      localStorage.removeItem(`otp_timer_start_${username}`);
      navigate(`/auth/set-password/${otp}/reset/${username}`);
    }
  }, [isSuccess, otp, username, navigate]);

  useEffect(() => {
    if (isError && error) {
      console.error('OTP verification error:', error);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSendSuccess) {
      setOtpMessage(true);
      setTimer(60);
      localStorage.setItem(`otp_timer_${username}`, '60');
      localStorage.setItem(`otp_timer_start_${username}`, Date.now().toString());

      setTimeout(() => {
        setOtpMessage(false);
      }, 2000);
    }
  }, [isSendSuccess, username]);

  // Handle resend error
  useEffect(() => {
    if (isSendError && sendError) {
      console.error('Resend OTP error:', sendError);
      setOtpMessage(false);
    }
  }, [isSendError, sendError]);

  const handleResend = async () => {
    try {
      await sendOtp({
        linkType: 'reset',
        requestBody: {
          email: username || '',
          isPatient: window.location.href.includes('patient'),
        },
      });
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      setOtpMessage(false);
    }
  };

  useApiFeedback(
    isError,
    error,
    isSuccess,
    (verifyData?.message || 'OTP verified successfully!') as string
  );

  useApiFeedback(isSendError, sendError, isSendSuccess, 'OTP sent successfully to your email!');

  const onSubmit = async (data: OtpVerificationRequest) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    const payload = {
      requestBody: {
        username: username || '',
        otp: data.otp,
      },
      isInvitation: isForgot ? false : true,
    };

    try {
      await verifyOtp(payload);
    } catch (error) {
      console.error('OTP verification failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container justifyContent={'center'} alignItems={'center'} size={12}>
        <Stack spacing={3} alignItems="center">
          <Typography variant="h3Bold" color="Primary.main">
            {loginConstants.OTP_VERIFICATION}
          </Typography>
          <Grid mb={4} mt={2} size={12}>
            <Typography variant="bodyBold4" color="Neutral.60">
              {loginConstants.CHECK_CODE}
            </Typography>
            <Typography variant="bodyBold4" color="Primary.main" sx={{ fontWeight: 'bold' }}>
              {username}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Stack spacing={2}>
              <Typography variant="bodyBold4" color="Primary.main">
                {loginConstants.ENTER_CODE}
              </Typography>
              <Stack alignItems="center">
                <Controller
                  name="otp"
                  control={control}
                  render={({ field }) => (
                    <OtpInput
                      value={field.value || ''}
                      onChange={value => {
                        field.onChange(value);
                        setOtp(value);
                      }}
                      length={6}
                      gap={1}
                      maxWidth="100%"
                      error={errors.otp?.message}
                    />
                  )}
                />
              </Stack>
            </Stack>
          </Grid>

          <CustomButton
            label={loginConstants.VERIFY_OTP}
            variant="filled"
            fullWidth
            type="submit"
            disabled={isPending}
          />
          {!isForgot ? (
            ''
          ) : (
            <Grid size={12}>
              {timer > 0 ? (
                <Typography variant="bodyBold4" color="Neutral.60">
                  {loginConstants.DIDNT_RECEIVE_CODE} {timer.toString().padStart(2, '0')}
                </Typography>
              ) : (
                <Typography variant="bodyBold4" color="Neutral.60">
                  {loginConstants.DIDNT_RECEIVE_CODE_LINK}{' '}
                  <Link
                    sx={{
                      cursor: isSendPending ? 'not-allowed' : 'pointer',
                      color: isSendPending ? 'text.disabled' : 'Primary.main',
                      opacity: isSendPending ? 0.6 : 1,
                    }}
                    onClick={isSendPending ? undefined : handleResend}
                  >
                    {isSendPending ? 'Sending...' : loginConstants.RESEND_CODE}
                  </Link>
                </Typography>
              )}
            </Grid>
          )}
        </Stack>
      </Grid>
    </form>
  );
};

export default EnterOtp;
