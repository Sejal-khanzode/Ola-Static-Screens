import * as yup from 'yup';
import { alphabetsRegex, emailRegex } from '../../constants/regex-constant';
import { ValidationMessages } from 'src/constants/formConst';

export const editProfileSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required(ValidationMessages.FIRST_NAME_REQUIRED)
    .matches(alphabetsRegex, ValidationMessages.FIRST_NAME_ALPHABETS),
  lastName: yup
    .string()
    .trim()
    .required(ValidationMessages.LAST_NAME_REQUIRED)
    .matches(alphabetsRegex, ValidationMessages.LAST_NAME_ALPHABETS),
  email: yup
    .string()
    .required(ValidationMessages.EmailRequired)
    .transform(value => value?.toLowerCase())
    .matches(emailRegex, {
      message: ValidationMessages.ValidEmailRequired,
    }),
  phone: yup
    .string()
    .required(ValidationMessages.CONTACT_NUMBER_REQUIRED)
    .min(12, ValidationMessages.CONTACT_NUMBER_MIN_LENGTH)
    .max(13, ValidationMessages.CONTACT_NUMBER_MAX_LENGTH),
  roles: yup.array().min(1, ValidationMessages.ROLE_REQUIRED),
  avatar: yup.string().optional(),
});

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required(ValidationMessages.OLD_PASSWORD_REQUIRED),
  newPassword: yup
    .string()
    .required(ValidationMessages.NEW_PASSWORD_REQUIRED)
    .min(6, ValidationMessages.PASSWORD_MIN_LENGTH)
    .notOneOf([yup.ref('oldPassword')], ValidationMessages.PASSWORD_NO_ONE_OF),
  confirmNewPassword: yup
    .string()
    .required(ValidationMessages.CONFIRM_PASSWORD_REQUIRED)
    .oneOf([yup.ref('newPassword')], ValidationMessages.PASSWORD_MATCH),
});

export const userSchema = yup.object().shape({
  firstName: yup.string().required(ValidationMessages.FIRST_NAME_REQUIRED),
  lastName: yup.string().required(ValidationMessages.LAST_NAME_REQUIRED),
  email: yup
    .string()
    .required(ValidationMessages.EmailRequired)
    .transform(value => value?.toLowerCase())
    .matches(emailRegex, {
      message: ValidationMessages.ValidEmailRequired,
    })
    .max(255, ValidationMessages.EmailMaxLength),
  phone: yup
    .string()
    .required(ValidationMessages.CONTACT_NUMBER_REQUIRED)
    .min(12, ValidationMessages.CONTACT_NUMBER_MIN_LENGTH)
    .max(13, ValidationMessages.CONTACT_NUMBER_MAX_LENGTH),
  roles: yup.array().min(1, ValidationMessages.ROLE_REQUIRED),
  active: yup.boolean(),
  npiNumber: yup.string().trim().when('roles', {
    is: (roles: string[]) =>
      roles &&
      (roles.includes('PHYSICIAN') || roles.includes('NURSE') || roles.includes('THERAPIST')),
    then: schema =>
      schema
        .required(ValidationMessages.NPI_NUMBER_REQUIRED)
        .matches(/^\d{10}$/, ValidationMessages.NPI_NUMBER_MIN_LENGTH)
        .min(10, ValidationMessages.NPI_NUMBER_MIN_LENGTH)
        .max(10, ValidationMessages.NPI_NUMBER_MAX_LENGTH),
    otherwise: schema => schema.optional(),
  }),

  providerType: yup.string().when('roles', {
    is: (roles: string[]) =>
      roles &&
      (roles.includes('PHYSICIAN') || roles.includes('NURSE') || roles.includes('THERAPIST')),
    then: schema => schema.required(ValidationMessages.PROVIDER_TYPE_REQUIRED),
    otherwise: schema => schema.optional(),
  }),

  specialities: yup.array().when('roles', {
    is: (roles: string[]) =>
      roles &&
      (roles.includes('PHYSICIAN') || roles.includes('NURSE') || roles.includes('THERAPIST')),
    then: schema => schema.min(1, ValidationMessages.SPECIALITY_REQUIRED),
    otherwise: schema => schema.optional(),
  }),

  licenseDetails: yup.array().when('roles', {
    is: (roles: string[]) =>
      !!roles?.length &&
      (roles.includes('PHYSICIAN') || roles.includes('NURSE') || roles.includes('THERAPIST')),
    then: schema => schema
      .min(1, ValidationMessages.LICENCED_STATE_REQUIRED)
      .of(
        yup.object().shape({
          licenseState: yup.object().shape({
            uuid: yup.string().required(ValidationMessages.LICENCED_STATE_REQUIRED),
            state: yup.string().required(),
            country: yup.string().required(),
          }).required(),
          licenseNumber: yup
            .string()
            .required(ValidationMessages.LICENSE_NUMBER_REQUIRED)
            .min(5, ValidationMessages.LICENSE_NUMBER_MIN_LENGTH)
            .max(10, ValidationMessages.LICENSE_NUMBER_MAX_LENGTH),
          licenseExpiryDate: yup
            .string()
            .required(ValidationMessages.LICENSE_EXPIRY_DATE_REQUIRED),
        })
      ),
    otherwise: schema => schema.optional(),
  }),

  clinics: yup.array().when('roles', {
    is: (roles: string[]) =>
      roles &&
      (roles.includes('PHYSICIAN') || roles.includes('NURSE') || roles.includes('THERAPIST')),
    then: schema => schema.optional(),
    otherwise: schema => schema.optional(),
  }),

  workExperience: yup.string().optional(),
  languagesSpoken: yup.string().optional(),
  bio: yup.string().optional(),
  experienceIn: yup.string().optional(),
  education: yup.string().optional(),

  gender: yup.string().when('roles', {
    is: (roles: string[]) =>
      roles &&
      (roles.includes('PHYSICIAN') || roles.includes('NURSE') || roles.includes('THERAPIST')),
    then: schema => schema.required(ValidationMessages.GENDER_REQUIRED),
    otherwise: schema => schema.optional(),
  }),
});
