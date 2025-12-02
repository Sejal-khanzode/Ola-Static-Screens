import { Grid, Typography } from '@mui/material';
import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import Popup from 'reactjs-popup';
import CustomButton from '../custom-button/custom-button';
import { profile } from 'src/constants/setting-constants';
import { PatientControllerService } from 'src/sdk/requests';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { getglobalRefetchSignFunction } from 'src/pages/apps/admin/pages/templates/consent-form/acknoledgement';

interface SignatureComponentProps {
  onSave?: (signatureData: string) => void;
  buttonLabel?: string;
  initialSignature?: string;
}

const SignatureComponent: React.FC<SignatureComponentProps> = ({
  onSave,
  buttonLabel,
  initialSignature,
}) => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const popupRef = useRef<any>(null);
  const [, setSignatureImage] = useState<string | null>(initialSignature || null);

  const userProfile = useSelector((state: RootState) => state.userProfileReducer.userProfile);

  const { mutate: addSignature, isSuccess } = useMutation({
    mutationFn: (signatureData: string) =>
      PatientControllerService.putApiMasterPatientAddSignature({
        requestBody: {
          signature: signatureData,
          patientId: userProfile?.uuid || '',
        },
      }),
  });

  const { refetch: refetchSignature } = useQuery({
    queryKey: ['patientSignature', userProfile?.uuid],
    enabled: !!userProfile?.uuid,
    queryFn: () =>
      PatientControllerService.getApiMasterPatientByPatientIdSignature({
        patientId: userProfile?.uuid as string,
      }),
  });

  const clear = () => sigCanvas.current?.clear();

  const extractBase64 = (dataUrl: string) => {
    if (!dataUrl) return '';
    return dataUrl.split(',')[1] || '';
  };

  const processImageData = (image: string | undefined): string => {
    if (!image) return '';
    if (typeof image === 'string' && !image.startsWith('data:')) {
      return image;
    }
    return extractBase64(image);
  };

  const save = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const signatureData = sigCanvas.current.toDataURL();
      setSignatureImage(signatureData);
      if (onSave) onSave(signatureData);
      addSignature(processImageData(signatureData));
      refetchSignature();
      popupRef.current?.close();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      getglobalRefetchSignFunction();
      refetchSignature()
    }
  }, [isSuccess]);

  return (
    <Grid container>
      <Grid size={12}>
        {buttonLabel !== 'Sign' && (
          <Typography
            variant="bodyRegular5"
            sx={{ cursor: 'pointer', textDecoration: 'underline', color: 'Primary.main' }}
            onClick={() => popupRef.current?.open()}
          >
            {buttonLabel}
          </Typography>
        )}

        <Popup
          ref={popupRef}
          modal
          closeOnDocumentClick={false}
          contentStyle={{
            padding: '20px',
            border: '2px solid gray',
            backgroundColor: 'white',
            borderRadius: '20px',
            maxWidth: '600px',
          }}
          overlayStyle={{ background: 'rgba(0, 0, 0, 0.4)' }}
        >
          <Grid container spacing={2} justifyContent="center">
            <Grid size={12} textAlign="center">
              <Typography variant="bodyMedium3">{profile.SIGNATURE_PAD}</Typography>
            </Grid>

            <Grid size={12} display="flex" justifyContent="center">
              <SignatureCanvas
                ref={sigCanvas}
                canvasProps={{
                  style: {
                    borderRadius: '12px',
                    backgroundColor: 'white',
                    border: '1px dashed black',
                  },
                  width: 500,
                  height: 200,
                }}
              />
            </Grid>

            <Grid size={12} display="flex" justifyContent="center" gap={1} mt={2}>
              <CustomButton label="Save" onClick={save} variant="filled" />
              <CustomButton label="Clear" onClick={clear} variant="filled" />
              <CustomButton
                label="Close"
                onClick={() => popupRef.current?.close()}
                variant="filled"
              />
            </Grid>
          </Grid>
        </Popup>
      </Grid>
    </Grid>
  );
};

export default SignatureComponent;
