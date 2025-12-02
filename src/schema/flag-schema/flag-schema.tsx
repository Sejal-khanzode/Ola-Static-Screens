import { ValidationMessages } from 'src/constants/formConst';
import { formConstants } from 'src/constants/setting-constants';
import * as yup from 'yup';

export const patientDetailsFlagSchema = yup.object().shape({
  patientFlags: yup
    .array()
    .min(1, ValidationMessages.SELECT_ATLEAST_ONE_FLAG)
    .required(ValidationMessages.SELECT_ATLEAST_ONE_FLAG),
});

export const patientFlagSchema = yup.object().shape({
  name: yup.string().trim().required(ValidationMessages.FLAG_NAME_REQUIRED),
  hexColor: yup.string().required(ValidationMessages.FLAG_COLOR_REQUIRED),
  active: yup.boolean().required(ValidationMessages.STATUS_REQUIRED),
});

export const patientApptFlagSchema = yup.object().shape({
  title: yup.string().required(formConstants.APPR_TYPE_REQ),
  colorCode: yup.string(),
  description: yup.string(),
  duration: yup
    .number()
    .required(ValidationMessages.DURATION_REQUIRED)
    .test('not-zero', ValidationMessages.DURATION_CANNOT_0, value => {
      if (!value) return true;
      return value !== 0;
    })
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value;
    }),
  time: yup.string(),
  procedureCodes: yup.array().of(yup.string()),
});
