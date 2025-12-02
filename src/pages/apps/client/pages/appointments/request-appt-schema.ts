import { scheduleAppointment } from 'src/constants/scheduling-constants';
import * as yup from 'yup';

export const requestAppointmentSchemaNew = yup.object().shape({
  providerId: yup.string().required(scheduleAppointment.PROVIDER_IS_REQUIRED),
  locationId: yup.string().when('mode', {
    is: (mode: string) => mode === 'IN_PERSON' || mode === 'HOME',
    then: schema => schema.required(scheduleAppointment.LOCATION_IS_REQUIRED),
    otherwise: schema => schema.notRequired(),
  }),
  chiefComplaint: yup.string().required(scheduleAppointment.REASON_FOR_VISIT_IS_REQUIRED),
  startTime: yup.string(),
  endTime: yup.string(),
  timezone: yup.string().required('Timezone is required'),
  mode: yup.string(),
  type: yup.string().required(scheduleAppointment.APPOINTMENT_TYPE_IS_REQUIRED),
});

export const cancelSchema = yup.object().shape({
  appointmentId: yup.string(),
  reason: yup.string().required('Reason is required'),
});
