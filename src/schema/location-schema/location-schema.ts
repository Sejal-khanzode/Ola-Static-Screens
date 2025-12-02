import * as yup from 'yup';
import { phoneRegex } from '../../constants/regex-constant';
import { ProfileValidationMessages, ValidationMessages } from 'src/constants/formConst';

export const locationSchema = yup.object().shape({
  name: yup.string().required(ValidationMessages.LOCATION_REQUIRED),
  // .matches(alphabetsRegex, ValidationMessages.LOC_ERR),
  locationId: yup.string().required('Location Id is required'),
  specialities: yup.object().test('has-keys', 'Speciality is required', function (value) {
    return value && Object.keys(value).length > 0;
  }),
  contact: yup
    .string()
    .required(ProfileValidationMessages.REQUIRED_CONTACT_NUMBER)
    .matches(phoneRegex, 'Please enter a valid contact number')
    .min(12, ValidationMessages.CONTACT_NUMBER_MIN_LENGTH)
    .max(13, ValidationMessages.CONTACT_NUMBER_MAX_LENGTH),
  npi: yup.string().optional().nullable(),
  timezone: yup.string().optional(),
  email: yup.string().optional().email(ValidationMessages.ValidEmailRequired),
  fax: yup.string().optional().nullable(),
  information: yup.string().optional().nullable(),
  physicalAddress: yup.object().shape({
    line1: yup.string().required('Line 1 is required'),
    line2: yup.string().optional().nullable(),
    city: yup.string().required('City is required').trim(),
    state: yup.string().required('State is required'),
    zipcode: yup
      .string()
      .required('Zipcode is required')
      .optional()
      .nullable()
      .test('zipcode-format', 'Zipcode should be either 5 or 9 digits', value => {
        if (!value) return true; // allow empty
        return /^\d{5}(-?\d{4})?$/.test(value);
      }),
    // .matches(zipcodeRegex, 'Please enter a valid zip code'),
    country: yup.string().optional().nullable(),
  }),
  billingAddress: yup.object().shape({
    line1: yup.string().required('Line 1 is required'),
    line2: yup.string().optional().nullable(),
    city: yup.string().required('City is required').trim(),
    state: yup.string().required('State is required'),
    zipcode: yup
      .string()
      .required('Zipcode is required')
      .optional()
      .nullable()
      .test('zipcode-format', 'Zipcode should be either 5 or 9 digits', value => {
        if (!value) return true; // allow empty
        return /^\d{5}(-?\d{4})?$/.test(value);
      }),
    country: yup.string().optional().nullable(),
  }),
  locationHours: yup.array().of(
    yup.object().shape({
      dayOfWeek: yup.string(),
      openingTime: yup.string(),
      closingTime: yup.string(),
    })
  ),
});
