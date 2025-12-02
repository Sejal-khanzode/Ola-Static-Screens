import * as yup from 'yup';
import { ValidationMessages } from 'src/constants/formConst';

export const clinicSchema = yup.object().shape({
  name: yup.string().trim().required(ValidationMessages.CLINIC_NAME_REQUIRED),
  phone: yup
    .string()
    .required(ValidationMessages.CONTACT_NUMBER_REQUIRED)
    .min(12, ValidationMessages.CONTACT_NUMBER_MIN_LENGTH)
    .max(13, ValidationMessages.CONTACT_NUMBER_MAX_LENGTH),
  groupNpiNumber: yup
    .string()
    .trim()
    .required(ValidationMessages.GROUP_NPI_NUMBER_REQUIRED)
    .min(10, ValidationMessages.NPI_NUMBER_MIN_LENGTH)
    .max(10, ValidationMessages.NPI_NUMBER_MIN_LENGTH),
  email: yup
    .string()
    .trim()
    .required(ValidationMessages.EmailRequired)
    .email(ValidationMessages.ValidEmailRequired),
  website: yup.string().trim().optional(),
  fax: yup.string().optional(),
  description: yup.string().trim().optional(),
  status: yup.boolean().optional(),
  physicalAddress: yup.object().shape({
    line1: yup.string().required(ValidationMessages.LINE_1_REQUIRED),
    line2: yup.string().optional(),
    city: yup.string().trim().required(ValidationMessages.CITY_REQUIRED),
    state: yup.string().required(ValidationMessages.STATE_REQUIRED),
    zipcode: yup
      .string()
      .required(ValidationMessages.ZIP_CODE_REQUIRED)
      .test('zipcode-format', ValidationMessages.ZIP_CODE_FORMAT, value => {
        if (!value) return true;
        return /^\d{5}(-?\d{4})?$/.test(value);
      }),
    // .matches(zipcodeRegex, 'Please enter a valid zip code'),
    country: yup.string().required(ValidationMessages.COUNTRY_REQUIRED),
  }),
  billingAddress: yup.object().shape({
    line1: yup.string().required(ValidationMessages.LINE_1_REQUIRED),
    line2: yup.string().optional(),
    city: yup.string().trim().required(ValidationMessages.CITY_REQUIRED),
    state: yup.string().required(ValidationMessages.STATE_REQUIRED),
    zipcode: yup
      .string()
      .required(ValidationMessages.ZIP_CODE_REQUIRED)
      .test('zipcode-format', ValidationMessages.ZIP_CODE_FORMAT, value => {
        if (!value) return true; // allow empty
        return /^\d{5}(-?\d{4})?$/.test(value);
      }),
    // .matches(zipcodeRegex, 'Please enter a valid zip code'),
    country: yup.string().required(ValidationMessages.COUNTRY_REQUIRED),
  }),
  specialities: yup
    .object()
    .test('has-specialities', ValidationMessages.SPECIALITY_REQUIRED, function (value) {
      return value && Object.keys(value).length > 0;
    }),

  cancellationCharges: yup.number().optional(),
  noShowCharges: yup.number().optional(),
});
