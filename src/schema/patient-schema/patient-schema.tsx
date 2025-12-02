import { ValidationMessages } from 'src/constants/formConst';
import * as yup from 'yup';

export const patientSchema = () =>
  yup.object().shape({
    firstName: yup.string().required(ValidationMessages.FIRST_NAME_REQUIRED),
    lastName: yup.string().required(ValidationMessages.LAST_NAME_REQUIRED),
    dob: yup.string().required(ValidationMessages.DATE_OF_BIRTH_REQUIRED),
    gender: yup.string().required(ValidationMessages.GENDER_REQUIRED),
    phone: yup
      .string()
      .required(ValidationMessages.CONTACT_NUMBER_REQUIRED)
      .min(12, ValidationMessages.CONTACT_NUMBER_MIN_LENGTH)
      .max(13, ValidationMessages.CONTACT_NUMBER_MAX_LENGTH),
    email: yup
      .string()
      .email(ValidationMessages.ValidEmailRequired)
      .required(ValidationMessages.EmailRequired),
    ethnicity: yup.string().optional().nullable(),
    race: yup.string().optional().nullable(),
    language: yup.string().optional().nullable(),
    maritalStatus: yup.string().optional().nullable(),
    ssn: yup
      .string()
      .trim()
      .max(4, ValidationMessages.SSN_FORMAT)
      .test('ssn-validation', ValidationMessages.SSN_FORMAT, value => {
        if (!value || value.trim() === '') return true;
        return /^\d{4}$/.test(value);
      })
      .optional()
      .nullable(),
    avatar: yup.string().optional().nullable(),
    emailVerified: yup.boolean().optional(),
    phoneVerified: yup.boolean().optional(),
    showDemographicsToAllClinics: yup.boolean().optional(),
    active: yup.boolean().optional(),
    archive: yup.boolean().optional(),
  });

export const addressSchema = () =>
  yup.object().shape({
    line1: yup.string().required(ValidationMessages.ADDRESS_LINE_1_REQUIRED),
    line2: yup.string().optional(),
    city: yup.string().required(ValidationMessages.CITY_REQUIRED),
    state: yup.string().required(ValidationMessages.STATE_REQUIRED),
    zipcode: yup
      .string()
      .required(ValidationMessages.ZIP_CODE_REQUIRED)
      .matches(/^\d{5}(-\d{4})?$/, ValidationMessages.ZIP_CODE_FORMAT),
  });

export const emergencyContactSchema = () =>
  yup.array().of(
    yup.object().shape({
      firstName: yup.string().optional(),
      lastName: yup.string().optional(),
      email: yup.string().optional(),
      mobile: yup
        .string()
        .optional()
        .test('mobile-length', ValidationMessages.CONTACT_NUMBER_MIN_LENGTH, value => {
          if (!value) return true;
          return value.length >= 12 && value.length <= 13;
        }),
      relationshipWithPatient: yup.string().optional().nullable(),
    })
  );

const primaryInsuranceSchema = () => {
  return yup.object().shape({
    insuranceType: yup.string().required(ValidationMessages.INSURANCE_TYPE_REQUIRED),
    insurancePayer: yup
      .object()
      .shape({
        payerId: yup.string().required(ValidationMessages.INSURANCE_NAME_REQUIRED),

        payerName: yup.string().required(ValidationMessages.INSURANCE_NAME_REQUIRED),
      })
      .required(ValidationMessages.INSURANCE_NAME_REQUIRED),
    memberId: yup.string().required(ValidationMessages.MEMBER_ID_REQUIRED),
    groupId: yup.string(),
    effectiveStartDate: yup.string().required(ValidationMessages.START_DATE_REQUIRED),
    effectiveEndDate: yup
      .string()
      .required(ValidationMessages.END_DATE_REQUIRED)
      .test(
        'endDate-greater-than-startDate',
        ValidationMessages.END_DATE_AFTER_START_DATE,
        function (value) {
          const { effectiveStartDate } = this.parent;
          if (!effectiveStartDate || !value) return true;
          return new Date(value) > new Date(effectiveStartDate);
        }
      ),
    insuredRelationshipWithPatient: yup
      .string()
      .required(ValidationMessages.PATIENT_RELATIONSHIP_REQUIRED),
    subscriberFirstName: yup.string().when('insuredRelationshipWithPatient', {
      is: (relationship: string) => relationship !== 'SELF',
      then: schema => schema.required(ValidationMessages.SUBSCRIBER_FIRST_NAME_REQUIRED),
      otherwise: schema => schema.notRequired(),
    }),
    subscriberLastName: yup.string().when('insuredRelationshipWithPatient', {
      is: (relationship: string) => relationship !== 'SELF',
      then: schema => schema.required(ValidationMessages.SUBSCRIBER_LAST_NAME_REQUIRED),
      otherwise: schema => schema.notRequired(),
    }),
    subscriberBirthDate: yup.string().when('insuredRelationshipWithPatient', {
      is: (relationship: string) => relationship !== 'SELF',
      then: schema => schema.required(ValidationMessages.SUBSCRIBER_DATE_OF_BIRTH_REQUIRED),
      otherwise: schema => schema.notRequired(),
    }),
    frontPhoto: yup.string().optional().nullable(),
    backPhoto: yup.string().optional().nullable(),
  });
};

const secondaryInsuranceSchema = () => {
  return yup.object().shape({
    insuranceType: yup.string().required(ValidationMessages.INSURANCE_TYPE_REQUIRED),
    insurancePayer: yup
      .object()
      .shape({
        payerId: yup.string().required(ValidationMessages.INSURANCE_NAME_REQUIRED),

        payerName: yup.string().required(ValidationMessages.INSURANCE_NAME_REQUIRED),
      })
      .required(ValidationMessages.INSURANCE_NAME_REQUIRED),
    memberId: yup.string().required(ValidationMessages.MEMBER_ID_REQUIRED),
    groupId: yup.string(),
    effectiveStartDate: yup.string().required(ValidationMessages.START_DATE_REQUIRED),
    effectiveEndDate: yup
      .string()
      .required(ValidationMessages.END_DATE_REQUIRED)
      .test(
        'endDate-greater-than-startDate',
        ValidationMessages.END_DATE_AFTER_START_DATE,
        function (value) {
          const { effectiveStartDate } = this.parent;
          if (!effectiveStartDate || !value) return true;
          return new Date(value) > new Date(effectiveStartDate);
        }
      ),
    insuredRelationshipWithPatient: yup
      .string()
      .required(ValidationMessages.PATIENT_RELATIONSHIP_REQUIRED),
    subscriberFirstName: yup.string().when('insuredRelationshipWithPatient', {
      is: (relationship: string) => relationship !== 'SELF',
      then: schema => schema.required(ValidationMessages.SUBSCRIBER_FIRST_NAME_REQUIRED),
      otherwise: schema => schema.notRequired(),
    }),
    subscriberLastName: yup.string().when('insuredRelationshipWithPatient', {
      is: (relationship: string) => relationship !== 'SELF',
      then: schema => schema.required(ValidationMessages.SUBSCRIBER_LAST_NAME_REQUIRED),
      otherwise: schema => schema.notRequired(),
    }),
    subscriberBirthDate: yup.string().when('insuredRelationshipWithPatient', {
      is: (relationship: string) => relationship !== 'SELF',
      then: schema => schema.required(ValidationMessages.SUBSCRIBER_DATE_OF_BIRTH_REQUIRED),
      otherwise: schema => schema.notRequired(),
    }),
    frontPhoto: yup.string().optional().nullable(),
    backPhoto: yup.string().optional().nullable(),
  });
};

export const AddPatientSchema = (
  hasInsurance: boolean = false,
  hasSecondaryInsurance: boolean = false
) =>
  yup.object().shape({
    patient: patientSchema(),
    active: yup.boolean().optional(),
    address: addressSchema(),
    emergencyContacts: emergencyContactSchema(),
    patientInsurances: yup.array().of(
      yup.lazy((value, { parent }) => {
        const index = Array.isArray(parent) ? parent.indexOf(value) : 0;

        if (index === 0 && hasInsurance) {
          return primaryInsuranceSchema();
        } else if (index === 1 && hasSecondaryInsurance) {
          return secondaryInsuranceSchema();
        }
        return yup.object().shape({});
      })
    ),
    hasInsurance: yup.boolean().optional(),
    hasSecondaryInsurance: yup.boolean().optional(),
    primaryProvider: yup.object().nullable().optional(),
    referringProvider: yup.object().nullable().optional(),
    emailConsent: yup.boolean().optional(),
    callConsent: yup.boolean().optional(),
    messageConsent: yup.boolean().optional(),
    timezone: yup.string().optional().nullable(),
    registrationDate: yup.string().optional(),
    source: yup.string().optional(),
    pharmacyLabRadiology: yup.object().test('hasProvider', function (value) {
      if (!value || Object.keys(value).length === 0) {
        return true;
      }
      return Object.keys(value).length > 0;
    }),
    customerId: yup.string().optional(),
  });

export const editPatientProfileSchema = yup.object({
  patient: patientSchema(),
  address: addressSchema(),
  emergencyContacts: emergencyContactSchema(),
});
