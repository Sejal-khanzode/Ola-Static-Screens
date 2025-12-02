import { ValidationMessages, VisitNotesEnum } from 'src/constants/formConst';
import * as yup from 'yup';

export const VisitNotesSchema = yup.object().shape({
  templateName: yup
    .string()
    .required(VisitNotesEnum.TEMPLATE_NOTE_NAME_REQUIRED)
    .min(2, VisitNotesEnum.TEMPLATE_NOTE_NAME_MIN_LENGTH)
    .max(50, VisitNotesEnum.TEMPLATE_NOTE_NAME_MAX_LENGTH)
    .trim(),
  templateType: yup.string().required(VisitNotesEnum.TEMPLATE_TYPE_REQUIRED),
  templateData: yup.object().shape({
    historyOfPresentIllness: yup.string().optional(),
    plan: yup.string().optional(),
    carePlan: yup.string().optional(),
    followUp: yup.string().optional(),
    objective: yup.string().optional(),
    subjective: yup.string().optional(),
    physicalExam: yup.string().optional(),
    chiefComplaint: yup.string().optional(),
    reviewOfSystems: yup.string().optional(),
    instructionsNote: yup.string().optional(),
    noteContent: yup.string().optional(),
    vitals: yup.object().shape({
      bloodPressureSystolic: yup.string().optional(),
      bloodPressureDiastolic: yup.string().optional(),
      heartRate: yup.string().optional(),
      temperature: yup.string().optional(),
      respiratoryRate: yup.string().optional(),
      oxygenSaturation: yup.string().optional(),
      weight: yup.string().optional(),
      height: yup.string().optional(),
      bodyMassIndex: yup.string().optional(),
      pain: yup.string().optional(),
      bloodPressureNote: yup.string().optional(),
      heartRateNote: yup.string().optional(),
      temperatureNote: yup.string().optional(),
      respiratoryRateNote: yup.string().optional(),
      oxygenSaturationNote: yup.string().optional(),
      weightNote: yup.string().optional(),
      heightNote: yup.string().optional(),
      bodyMassIndexNote: yup.string().optional(),
      painNote: yup.string().optional(),
    }),
    diagnosis: yup.array().of(
      yup.object().shape({
        uuid: yup.string().optional(),
        code: yup.string().optional(),
        description: yup.string().optional(),
      })
    ),
  }),
});

export const uploadDocumentSchema = yup.object().shape({
  documentTypeId: yup.string().required(ValidationMessages.DOCUMENT_TYPE_REQUIRED),
  documentDate: yup.string().required(ValidationMessages.DATE_REQUIRED),
  name: yup.string().required(ValidationMessages.DOCUMENT_NAME_REQUIRED),
  file: yup
    .mixed()
    .nullable()
    .test('required', ValidationMessages.DOCUMENT_FILE_REQUIRED, function(value) {
      const { isEdit } = this.options.context || {};
      if (isEdit) {
        const hasExistingFile = !!this.parent.existingFile; 
        return !!(value || hasExistingFile);
      }
      return !!value;
    })
});