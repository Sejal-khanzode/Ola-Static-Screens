import { ValidationMessages } from 'src/constants/formConst';
import * as yup from 'yup';

export const AddAllergySchema = yup.object({
  allergyType: yup.string().required(ValidationMessages.ALLERGY_TYPE_REQUIRED),
  allergy: yup
    .object()
    .shape({
      uuid: yup.string().required(),
      name: yup.string().required(ValidationMessages.ALLERGY_NAME_REQUIRED),
    })

    .required(ValidationMessages.ALLERGY_NAME_REQUIRED),
  reaction: yup.string().required(ValidationMessages.REACTION_REQUIRED),
  severity: yup.string().required(ValidationMessages.SEVERITY_REQUIRED),
  onSetDate: yup.string().required(ValidationMessages.ON_SET_DATE_REQUIRED),
  note: yup.string().optional(),
});

export const AddDiagnosisSchema = yup.object({
  medicalCode: yup
    .object()
    .shape({
      uuid: yup.string().required(ValidationMessages.DIAGNOSIS_REQUIRED),
      code: yup.string().required(ValidationMessages.DIAGNOSIS_REQUIRED),
      description: yup.string().required(ValidationMessages.DIAGNOSIS_REQUIRED),
    })
    .required(ValidationMessages.DIAGNOSIS_REQUIRED),
  active: yup.boolean().required(ValidationMessages.STATUS_REQUIRED),
  type: yup.string().required(ValidationMessages.DIAGNOSIS_TYPE_REQUIRED),
  diagnosedDate: yup.string().required(ValidationMessages.ON_SET_DATE_REQUIRED),
  note: yup.string().optional(),
  uuid: yup.string().optional(),
});

export const AddFamilyHistorySchema = yup.object({
  problems: yup.string().required(ValidationMessages.PROBLEM_NAME_REQUIRED),
  relative: yup.string().required(ValidationMessages.RELATIVE_REQUIRED),
  onSetAge: yup.string().required(ValidationMessages.ON_SET_AGE_REQUIRED),
  died: yup.string().optional(),
  note: yup.string().optional(),
});


export const AddMedicalHistorySchema = yup.object({
  conditionName: yup.string().required(ValidationMessages.CONDITION_NAME_REQUIRED),
  medicalHistoryDate: yup.string().required(ValidationMessages.DATE_REQUIRED),
  note: yup.string().optional(),
});

export const AddSurgicalHistorySchema = yup.object({
  surgeryName: yup.string().required(ValidationMessages.SURGERY_NAME_REQUIRED),
  surgeryDate: yup.string().required(ValidationMessages.DATE_REQUIRED),
  note: yup.string().optional(),
});

export const AddMedicationSchema = yup.object({
  medicine: yup.string().required(ValidationMessages.MEDICINES_REQUIRED),
  sig: yup.object().shape({
    quantity: yup.string().required(ValidationMessages.SIG_REQUIRED),
    unit: yup.string().required(ValidationMessages.SIG_REQUIRED),
  }).required(ValidationMessages.SIG_REQUIRED),
  route: yup.string().required(ValidationMessages.ROUTE_REQUIRED),
  startDate: yup.string().required(ValidationMessages.START_DATE_REQUIRED),
  endDate: yup.string().required(ValidationMessages.END_DATE_REQUIRED),
  dispensing: yup.string().optional(),
  status: yup.string().optional(),
});