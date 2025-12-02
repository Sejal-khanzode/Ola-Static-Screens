import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  RequestAppointmentManagementService,
  AppointmentManagementService,
} from 'src/sdk/requests';
import CustomButton from '../core/reusable/custom-button/custom-button';
import CustomSelect from '../core/reusable/custom-select/custom-select';
import CustomTextArea from '../core/reusable/custom-text-area/custom-textarea';
import moment from 'moment';
import CustomLabel from '../core/reusable/custom-label/custom-label';
import { PatientFormLabels, VisitNotesEnum } from 'src/constants/formConst';
import { templateConstants } from 'src/constants/setting-constants';
import { newAppointment, schedulingConstants } from 'src/constants/scheduling-constants';

interface AppointmentCancelDrawerProps {
  selectedRequest: any;
  buttonAction: 'approve' | 'cancel' | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const AppointmentCancelDrawer: React.FC<AppointmentCancelDrawerProps> = ({
  selectedRequest,
  buttonAction,
  onClose,
  onSuccess,
}) => {
  const [status, setStatus] = useState<'APPROVED' | 'REJECTED'>(
    buttonAction === 'approve' ? 'APPROVED' : 'REJECTED'
  );
  const [reason, setReason] = useState('');
  const queryClient = useQueryClient();

  const { mutateAsync: updateRequestStatus, isPending: isUpdatingRequest } = useMutation({
    mutationFn: ({ uuid, requestBody }: { uuid: string; requestBody: any }) =>
      RequestAppointmentManagementService.patchApiMasterRequestAppointmentByUuidStatus({
        uuid,
        requestBody,
      }),
  });

  const { mutateAsync: updateAppointmentStatus, isPending: isUpdatingAppointment } = useMutation({
    mutationFn: ({ uuid, requestBody }: { uuid: string; requestBody: any }) =>
      AppointmentManagementService.patchApiMasterAppointmentsByUuidStatus({
        uuid,
        requestBody,
      }),
  });

  const handleSubmit = async () => {
    try {
      await updateRequestStatus({
        uuid: selectedRequest.uuid,
        requestBody: {
          status,
          rejectionReason: status === 'REJECTED' ? reason : null,
        },
      });

      if (status === 'APPROVED' && selectedRequest.appointmentId) {
        await updateAppointmentStatus({
          uuid: selectedRequest.appointmentId,
          requestBody: {
            status: 'CANCELLED',
            cancelReason: reason || 'Cancelled by provider',
          },
        });
      }

      queryClient.invalidateQueries({ queryKey: ['requestAppt'] });

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error updating appointment cancellation:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ marginBottom: 3, backgroundColor: 'Neutral.10', borderRadius: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          {PatientFormLabels.PATIENT_INFORMATION}
        </Typography>
        <Grid container spacing={2} alignItems="start">
          <Grid size={{ xs: 4 }}>
            <Typography variant="bodyBold4" color="text.secondary" sx={{ minWidth: '120px' }}>
              Name:
            </Typography>
          </Grid>
          <Grid size={{ xs: 8 }}>
            <Typography variant="titleMedium4">
              {selectedRequest?.patientClinic?.patient?.firstName}{' '}
              {selectedRequest?.patientClinic?.patient?.lastName}
            </Typography>
          </Grid>

          <Grid size={{ xs: 4 }}>
            <Typography variant="bodyBold4" color="text.secondary" sx={{ minWidth: '120px' }}>
              MRN:
            </Typography>
          </Grid>
          <Grid size={{ xs: 8 }}>
            <Typography variant="titleMedium4">{selectedRequest?.patientClinic?.mrn}</Typography>
          </Grid>

          <Grid size={{ xs: 4 }}>
            <Typography variant="bodyBold4" color="text.secondary" sx={{ minWidth: '120px' }}>
              DOB:
            </Typography>
          </Grid>
          <Grid size={{ xs: 8 }}>
            <Typography variant="titleMedium4">
              {' '}
              {moment(selectedRequest?.patientClinic?.patient?.dob).format('MM/DD/YYYY')}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ marginBottom: 3, backgroundColor: 'Neutral.10', borderRadius: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          {VisitNotesEnum.APPOINTMENT_DETAILS}
        </Typography>

        <Grid container spacing={2} alignItems="start">
          <Grid size={{ xs: 4 }}>
            <Typography variant="bodyBold4" color="text.secondary" sx={{ minWidth: '120px' }}>
              {newAppointment.PROVIDER}:
            </Typography>
          </Grid>
          <Grid size={{ xs: 8 }}>
            <Typography variant="titleMedium4">
              {selectedRequest?.provider?.firstName} {selectedRequest?.provider?.lastName}
            </Typography>
          </Grid>

          <Grid size={{ xs: 4 }}>
            <Typography variant="bodyBold4" color="text.secondary" sx={{ minWidth: '120px' }}>
              {VisitNotesEnum.LOCATION}:
            </Typography>
          </Grid>
          <Grid size={{ xs: 8 }}>
            <Typography variant="titleMedium4">
              {selectedRequest?.mode === 'VIRTUAL' ? 'Virtual' : selectedRequest?.location?.name}
            </Typography>
          </Grid>

          <Grid size={{ xs: 4 }}>
            <Typography variant="bodyBold4" color="text.secondary" sx={{ minWidth: '120px' }}>
              {templateConstants.DATE}:
            </Typography>
          </Grid>
          <Grid size={{ xs: 8 }}>
            <Typography variant="titleMedium4">
              {moment(selectedRequest?.requestedStartTime).format('MM/DD/YYYY')}
            </Typography>
          </Grid>

          <Grid size={{ xs: 4 }}>
            <Typography variant="bodyBold4" color="text.secondary" sx={{ minWidth: '120px' }}>
              Time:
            </Typography>
          </Grid>
          <Grid size={{ xs: 8 }}>
            <Typography variant="titleMedium4">
              {moment(selectedRequest?.requestedStartTime).format('hh:mm A')} -{' '}
              {moment(selectedRequest?.requestedEndTime).format('hh:mm A')}
            </Typography>
          </Grid>

          <Grid size={{ xs: 4 }}>
            <Typography variant="bodyBold4" color="text.secondary" sx={{ minWidth: '120px' }}>
              Type:
            </Typography>
          </Grid>
          <Grid size={{ xs: 8 }}>
            <Typography variant="titleMedium4">
              {selectedRequest?.appointmentType?.title}
            </Typography>
          </Grid>

          <Grid size={{ xs: 4 }}>
            <Typography variant="bodyBold4" color="text.secondary" sx={{ minWidth: '120px' }}>
              Cancel Reason By Client:
            </Typography>
          </Grid>
          <Grid size={{ xs: 8 }}>
            <Typography variant="titleMedium4">
              {selectedRequest?.requestReason ? selectedRequest?.requestReason : '-'}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box mb={2}>
        <CustomLabel label="Status" />
        <CustomSelect
          placeholder="Select Action"
          value={status}
          onChange={e => setStatus(e.target.value as 'APPROVED' | 'REJECTED')}
          items={[
            { value: 'APPROVED', label: newAppointment.APPROVE_CANCELLATION },
            { value: 'REJECTED', label: newAppointment.REJ_CANCELLATION },
          ]}
          isDisabled={buttonAction === 'cancel'}
        />
      </Box>

      <Box>
        <CustomLabel label="Reason" />
        <CustomTextArea
          name="reason"
          value={reason}
          onChange={e => setReason(e.target.value)}
          placeholder={
            status === 'APPROVED'
              ? schedulingConstants.REASON_FOR_CANCELLATION
              : newAppointment.REJECT_REASON
          }
          minRow={3}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <CustomButton
          variant="outlined"
          label="Cancel"
          onClick={onClose}
          disabled={isUpdatingRequest || isUpdatingAppointment}
        />
        <CustomButton
          variant="filled"
          label={
            status === 'APPROVED'
              ? newAppointment.APPROVE_CANCELLATION
              : newAppointment.REJ_CANCELLATION
          }
          onClick={handleSubmit}
        />
      </Box>
    </Box>
  );
};

export default AppointmentCancelDrawer;
