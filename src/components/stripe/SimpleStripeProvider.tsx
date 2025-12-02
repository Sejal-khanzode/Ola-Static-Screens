import React, { createContext, useContext, useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import { ClinicControllerService, PatientClinicControllerService } from 'src/sdk/requests';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';

interface SimpleStripeProviderProps {
  children: React.ReactNode;
}

interface StripeAccountContextType {
  hasStripeAccount: boolean;
}

const StripeAccountContext = createContext<StripeAccountContextType>({ hasStripeAccount: true });

export const useStripeAccount = () => useContext(StripeAccountContext);

const SimpleStripeProvider: React.FC<SimpleStripeProviderProps> = ({ children }) => {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [hasStripeAccount, setHasStripeAccount] = useState<boolean>(true);

  const patientUuid = getDataFromLocalStorage('patientUUID');
  
  const { data: profileData, isPending: isLoadingPatientData } = useQuery({
    queryKey: ['patientDatas', patientUuid],
    queryFn: () =>
      PatientClinicControllerService.getApiMasterPatientClinicByPatientClinicUuid({
        patientClinicUuid: patientUuid as string,
      }),
    enabled: !!patientUuid,
  });

  // Extract clinic ID from position 0 of clinic data
  const clinicId = profileData?.data?.clinic ? Object.keys(profileData.data.clinic)[0] : undefined;

  const { data: clinicData, isPending: isLoadingClinicData } = useQuery({
    queryKey: ['clinicData', clinicId],
    queryFn: () =>
      ClinicControllerService.getApiMasterClinicByClinicId({
        clinicId: clinicId as string,
      }),
    enabled: !!clinicId,
  });

  useEffect(() => {
    const stripeAccountId = clinicData?.data?.stripeAccountId;

    if (stripeAccountId) {
      const stripe = loadStripe(
        'pk_test_51SAWQfCFhz4bvtxlGpJDAV4pm8XHYndNl5tKmAzLICqr5GwAXtj3ld6CXBrSdSHhcBGCBkddaRTehglLZGN0lrmt00Wmr0wS6L',
        {
          stripeAccount: stripeAccountId as string,
        }
      );
      setStripePromise(stripe);
      setHasStripeAccount(true);
    } else {
      // Load Stripe without connected account for direct charges
      const stripe = loadStripe(
        'pk_test_51SAWQfCFhz4bvtxlGpJDAV4pm8XHYndNl5tKmAzLICqr5GwAXtj3ld6CXBrSdSHhcBGCBkddaRTehglLZGN0lrmt00Wmr0wS6L'
      );
      setStripePromise(stripe);
      setHasStripeAccount(false);
    }
  }, [clinicData]);

  if (isLoadingPatientData || isLoadingClinicData || !stripePromise) {
    return null;
  }
  
  return (
    <StripeAccountContext.Provider value={{ hasStripeAccount }}>
      <Elements stripe={stripePromise}>{children}</Elements>
    </StripeAccountContext.Provider>
  );
};

export default SimpleStripeProvider;
