import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BackArrowIcon } from 'src/assets/icons/backArrowIcon';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { VisitNotesEnum } from 'src/constants/formConst';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import CustomClinicSelect from 'src/components/core/reusable/custom-clinic-select/custom-clinic-select';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { VisitNotesSchema } from 'src/schema/template-schema/template-schema';
import Details from '../ros-pe-details/Details';

import VitalTable from '../ros-pe-details/VitalTable';
import './Editor.css';
import {
  ClinicalTemplateService,
  MedicalCodeControllerService,
  VisitNoteTemplateService,
} from 'src/sdk/requests';
import { VitalFormData } from '../ros-pe-details/VitalTable';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useDispatch } from 'react-redux';
import { formConstants } from 'src/constants/setting-constants';

export const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'list',
  'indent',
  'align',
  'blockquote',
  'code-block',
];

// Quill editor modules configuration
export const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    ['blockquote', 'code-block'],
    ['clean'],
  ],
};
export interface VisitNoteFormData {
  templateName: string;
  templateType: string;
  templateData: {
    historyOfPresentIllness?: string;
    subjective?: string;
    objective?: string;
    assessment?: string;
    plan?: string;
    provider?: string;
    location?: string;
    age?: string;
    lastEncounter?: string;
    todayNote?: string;
    reviewOfSystems?: string;
    physicalExam?: string;
    vitals?: VitalFormData;
    pain?: string;
    diagnosis?: { uuid: string; code: string; description: string }[];
    carePlan?: string;
    chiefComplaint?: string;
    instructionsNote?: string;
    followUp?: string;
    medications?: string;
  };
}

interface TemplateDataContent {
  historyOfPresentIllness?: string;
  subjective?: string;
  objective?: string;
  plan?: string;
  carePlan?: string;
  followUp?: string;
  physicalExam?: string;
  chiefComplaint?: string;
  reviewOfSystems?: string;
  instructionsNote?: string;
  diagnosis?: { uuid: string; code: string; description: string }[];
  noteContent?: string;
  vitals?: VitalFormData;
  peQuestionsAnswer?: Record<string, any>;
  rosQuestionAnswer?: Record<string, any>;
  assessment?: string;
  procedureData?: string[];
  icdCodeData?: string[];
  procedureCodeName?: string[];
  icdCodeName?: string;
  medications?: string;
}

interface TemplateData {
  templateName?: string;
  templateType?: string;
  templateData?: TemplateDataContent;
}

interface AddVisitNotesProps {
  onClose?: () => void;
  onSubmit?: (data: VisitNoteFormData) => void;
  initialData?: VisitNoteFormData;
  isEdit?: boolean;
}

const templateTypeList = [
  { value: 'SIMPLE_NOTE', label: 'Simple Note' },
  { value: 'SOAP_NOTE', label: 'SOAP Note' },
  { value: 'CONSULTATION_NOTE', label: 'Consultation Note' },
];

const AddVisitNotes: React.FC<AddVisitNotesProps> = ({ initialData, isEdit }) => {
  const navigate = useNavigate();
  const { uuid } = useParams();
  const queryClient = useQueryClient();
  const [medicalHistoryContent, setMedicalHistoryContent] = useState('');
  const [objectiveContent, setObjectiveContent] = useState('');
  const [planContent, setPlanContent] = useState('');
  const [assessmentContent, setAssessmentContent] = useState('');
  const [medicationsContent, setMedicationsContent] = useState('');

  const [noteContent, setNoteContent] = useState('');
  const [historyOfPresentIllnessContent, setHistoryOfPresentIllnessContent] = useState('');
  const [followUpContent, setFollowUpContent] = useState('');
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<
    Array<{ uuid: string; code: string; description: string }>
  >([]);
  const [_, setVitalFormData] = useState<VitalFormData>({
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    heartRate: '',
    bodyTemperature: '',
    respiratoryRate: '',
    oxygenSaturationLevel: '',
    weight: '',
    height: '',
    pain: '',
    bloodPressureNote: '',
    heartRateNote: '',
    temperatureNote: '',
    respiratoryRateNote: '',
    oxygenSaturationNote: '',
    weightNote: '',
    heightNote: '',
    painNote: '',
  });
  const [carePlanContent, setCarePlanContent] = useState('');
  const [instructionsNoteContent, setInstructionsNoteContent] = useState('');
  const location = useLocation();
  const editForm = location?.state?.edit;
  const dispatch = useDispatch();

  const [rosQuestionsAnswer, setRosQuestionsAnswer] = useState<Record<string, any>>({});
  const [peQuestionsAnswer, setPeQuestionsAnswer] = useState<Record<string, any>>({});
  const [originalRosData, setOriginalRosData] = useState<Record<string, any>>({});
  const [originalPeData, setOriginalPeData] = useState<Record<string, any>>({});
  const [selectedProcedureCodes, setSelectedProcedureCodes] = useState<string[]>([]);
  const [selectedIcdCodes, setSelectedIcdCodes] = useState<string[]>([]);
  const [procedureCodeName, setProcedureCodeName] = useState<string[]>([]);
  const [icdCodeName, setIcdCodeName] = useState<string>('');

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<VisitNoteFormData>({
    resolver: yupResolver(VisitNotesSchema) as any,
    defaultValues: initialData || {
      templateName: '',
      templateType: 'SOAP_NOTE',
      templateData: {
        historyOfPresentIllness: '',
        chiefComplaint: '',
        subjective: '',
        objective: '',
        plan: '',
        carePlan: '',
        followUp: '',
        instructionsNote: '',
        reviewOfSystems: '',
        physicalExam: '',
        pain: '',
        diagnosis: [],
        vitals: {
          bloodPressureSystolic: '',
          bloodPressureDiastolic: '',
          heartRate: '',
          bodyTemperature: '',
          respiratoryRate: '',
          oxygenSaturationLevel: '',
          weight: '',
          height: '',
          pain: '',
          bloodPressureNote: '',
          heartRateNote: '',
          temperatureNote: '',
          respiratoryRateNote: '',
          oxygenSaturationNote: '',
          weightNote: '',
          heightNote: '',
          painNote: '',
        },
      },
    },
  });

  const { data: icdCodeList } = useQuery({
    queryKey: ['icdCodeList'],
    queryFn: () =>
      MedicalCodeControllerService.getApiMasterMedicalCodes({
        type: 'ICD',
        active: true,
        archive: false,
      }),
  });

  const { data: procedureCodes } = useQuery({
    queryKey: ['medicalCodeData', 'CPT'],
    queryFn: () =>
      MedicalCodeControllerService.getApiMasterMedicalCodes({
        type: 'CPT',
        active: true,
        archive: false,
      }),
  });

  const { data: customCodes } = useQuery({
    queryKey: ['medicalCodeData', 'CUSTOM'],
    queryFn: () =>
      MedicalCodeControllerService.getApiMasterMedicalCodes({
        type: 'CUSTOM',
        active: true,
        archive: false,
      }),
  });

  const procedureCodesData = procedureCodes?.data?.content as any;
  const customCodesData = customCodes?.data?.content as any;

  const allCodes = [...(procedureCodesData || []), ...(customCodesData || [])];

  const apiIcdCodeListData = icdCodeList?.data?.content;
  const { data: reviewOfSystemsList } = useQuery({
    queryKey: ['reviewOfSystems'],
    queryFn: () =>
      ClinicalTemplateService.getApiMasterClinicalTemplate({
        templateType: 'ROS',
      }),
  });

  const { data: physicalExamList } = useQuery({
    queryKey: ['physicalExam'],
    queryFn: () =>
      ClinicalTemplateService.getApiMasterClinicalTemplate({
        templateType: 'PE',
      }),
  });

  const {
    mutate: createTemplate,
    isPending: isCreating,
    isSuccess: isSuccessCreate,
    isError: isErrorCreate,
    error: errorCreate,
    data: dataCreate,
  } = useMutation({
    mutationFn: VisitNoteTemplateService.postApiMasterVisitNoteTemplate,
    onSuccess: () => {
      // Clear the visit note template cache to ensure fresh data on next load
      queryClient.invalidateQueries({ queryKey: ['visitNoteTemplate'] });
      navigate('/admin/templates/visit-notes');
    },
  });

  const { data: visitNoteTemplateData, isSuccess: isTemplateDataLoaded } = useQuery({
    queryKey: ['visitNoteTemplate', uuid],
    queryFn: () =>
      VisitNoteTemplateService.getApiMasterVisitNoteTemplateByTemplateId({
        templateId: uuid || '',
      }),
    enabled: !!uuid,
  });

  const {
    mutate: updateTemplate,
    isPending: isUpdating,
    isSuccess: isSuccessUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    data: dataUpdate,
  } = useMutation({
    mutationFn: VisitNoteTemplateService.putApiMasterVisitNoteTemplate,
    onSuccess: () => {
      // Clear the visit note template cache to ensure fresh data on next load
      queryClient.invalidateQueries({ queryKey: ['visitNoteTemplate'] });
      navigate('/admin/templates/visit-notes');
    },
  });

  useEffect(() => {
    if (!isTemplateDataLoaded || !visitNoteTemplateData?.data) return;

    // Check if we're in edit mode: either editForm is true, isEdit prop is true, or we have a uuid (editing existing template)
    const isEditMode = editForm || isEdit || uuid;
    if (!isEditMode) return;

    const templateData = visitNoteTemplateData.data as TemplateData;
    const templateDataContent = templateData.templateData as TemplateDataContent;

    reset({
      templateName: templateData.templateName || '',
      templateType: templateData.templateType || 'SOAP_NOTE',
      templateData: {
        ...templateDataContent,
        diagnosis: templateDataContent?.diagnosis || [],
      },
    });

    if (templateDataContent?.subjective) setMedicalHistoryContent(templateDataContent.subjective);
    if (templateDataContent?.historyOfPresentIllness)
      setHistoryOfPresentIllnessContent(templateDataContent.historyOfPresentIllness);
    if (templateDataContent?.objective) setObjectiveContent(templateDataContent.objective);
    if (templateDataContent?.plan) setPlanContent(templateDataContent.plan);
    if (templateDataContent?.medications) setMedicationsContent(templateDataContent.medications);

    if (templateDataContent?.assessment) setAssessmentContent(templateDataContent.assessment);

    if (templateDataContent?.followUp) setFollowUpContent(templateDataContent.followUp);
    if (templateDataContent?.instructionsNote)
      setInstructionsNoteContent(templateDataContent.instructionsNote);
    if (templateDataContent?.carePlan) setCarePlanContent(templateDataContent.carePlan);
    if (templateDataContent?.noteContent) setNoteContent(templateDataContent.noteContent);

    if (templateDataContent?.diagnosis?.length) setSelectedDiagnosis(templateDataContent.diagnosis);
    if (templateDataContent?.vitals) setVitalFormData(templateDataContent.vitals);

    if (templateDataContent?.peQuestionsAnswer) {
      setPeQuestionsAnswer(templateDataContent.peQuestionsAnswer);
    }
    if (templateDataContent?.rosQuestionAnswer) {
      setRosQuestionsAnswer(templateDataContent.rosQuestionAnswer);
    }
    if (templateDataContent?.procedureData) {
      setSelectedProcedureCodes(templateDataContent.procedureData);
    }
    if (templateDataContent?.icdCodeData) {
      setSelectedIcdCodes(templateDataContent.icdCodeData);
    }
    if (templateDataContent?.procedureCodeName) {
      setProcedureCodeName(templateDataContent.procedureCodeName);
    }
    if (templateDataContent?.icdCodeName) {
      setIcdCodeName(templateDataContent.icdCodeName);
    }

    // Mark initial load as complete after a delay to ensure all form population is done
    setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);
  }, [isTemplateDataLoaded, visitNoteTemplateData?.data, editForm, isEdit, uuid]);

  const reviewOfSystemsListData = reviewOfSystemsList?.data?.content;
  const physicalExamListData = physicalExamList?.data?.content;

  const templateType = watch('templateType');
  const reviewOfSystems = watch('templateData.reviewOfSystems');
  const physicalExam = watch('templateData.physicalExam');
  const isSoapNote = templateType === 'SOAP_NOTE';
  const isSimpleNote = templateType === 'SIMPLE_NOTE';
  const isConsultationNote = templateType === 'CONSULTATION_NOTE';

  // Check if we're in edit mode and data is still loading
  const isEditMode = editForm || isEdit || uuid;
  const isDataReady = !isEditMode || (isEditMode && isTemplateDataLoaded);

  // Track previous values to detect actual changes
  const [prevPhysicalExam, setPrevPhysicalExam] = useState<string | undefined>(undefined);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [prevReviewOfSystems, setPrevReviewOfSystems] = useState<string | undefined>(undefined);

  // Reset peQuestionsAnswer when physicalExam dropdown changes to a different value
  useEffect(() => {
    if (
      physicalExam &&
      prevPhysicalExam !== undefined &&
      physicalExam !== prevPhysicalExam &&
      !isInitialLoad
    ) {
      // Reset when the UUID actually changes (user selected a different template)
      // But don't reset during initial form population
      setPeQuestionsAnswer({});
      setOriginalPeData({}); // Clear original data when dropdown changes
    }
    setPrevPhysicalExam(physicalExam);
  }, [physicalExam, prevPhysicalExam, isInitialLoad, editForm]);

  // Reset rosQuestionsAnswer when reviewOfSystems dropdown changes to a different value
  useEffect(() => {
    if (
      reviewOfSystems &&
      prevReviewOfSystems !== undefined &&
      reviewOfSystems !== prevReviewOfSystems &&
      !isInitialLoad
    ) {
      // Reset when the UUID actually changes (user selected a different template)
      setRosQuestionsAnswer({});
      // Don't clear originalRosData immediately - let Details component update it with new template data
    }
    setPrevReviewOfSystems(reviewOfSystems);
  }, [reviewOfSystems, prevReviewOfSystems, isInitialLoad, editForm]);

  const handleFormSubmit = async (data: VisitNoteFormData) => {
    try {
      let templateData: any = {};

      // Use original data if user answers are empty
      const finalPeQuestionsAnswer =
        Object.keys(peQuestionsAnswer).length === 0 ? originalPeData : peQuestionsAnswer;

      const finalRosQuestionsAnswer =
        Object.keys(rosQuestionsAnswer).length === 0 ? originalRosData : rosQuestionsAnswer;

      if (isSoapNote) {
        templateData = {
          chiefComplaint: data.templateData.chiefComplaint,
          subjective: medicalHistoryContent,
          objective: objectiveContent,
          assessment: assessmentContent,
          plan: planContent,
          followUp: followUpContent,
          carePlan: carePlanContent,
          instructionsNote: instructionsNoteContent,
          vitals: data.templateData.vitals,
          reviewOfSystems: data.templateData.reviewOfSystems,
          physicalExam: data.templateData.physicalExam,
          peQuestionsAnswer: finalPeQuestionsAnswer,
          rosQuestionAnswer: finalRosQuestionsAnswer,
          procedureData: selectedProcedureCodes,
          icdCodeData: selectedIcdCodes,
          procedureCodeName: procedureCodeName,
          icdCodeName: icdCodeName,
          medications: medicationsContent,
        };
      } else if (isSimpleNote) {
        templateData = {
          historyOfPresentIllness: historyOfPresentIllnessContent,
          followUp: followUpContent,
          peQuestionsAnswer: finalPeQuestionsAnswer,
          rosQuestionAnswer: finalRosQuestionsAnswer,
          procedureData: selectedProcedureCodes,
          icdCodeData: selectedIcdCodes,
          procedureCodeName: procedureCodeName,
          icdCodeName: icdCodeName,
        };
      } else if (isConsultationNote) {
        templateData = {
          diagnosis: selectedDiagnosis,
          noteContent: noteContent,
          peQuestionsAnswer: finalPeQuestionsAnswer,
          rosQuestionAnswer: finalRosQuestionsAnswer,
          procedureData: selectedProcedureCodes,
          icdCodeData: selectedIcdCodes,
          procedureCodeName: procedureCodeName,
          icdCodeName: icdCodeName,
        };
      }

      const apiPayload = {
        templateName: data.templateName,
        templateType: data.templateType as 'SOAP_NOTE' | 'SIMPLE_NOTE' | 'CONSULTATION_NOTE',
        templateData: templateData,
      };

      if (editForm) {
        updateTemplate({
          requestBody: { ...apiPayload, uuid: uuid },
        });
      } else {
        createTemplate({
          requestBody: apiPayload,
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCancel = () => {
    reset();
    navigate('/admin/templates/visit-notes', { replace: true });
  };

  // Helper functions for CustomClinicSelect-style diagnosis selection
  const getAvailableDiagnosisOptions = () => {
    const selectedDiagnosisUuids = selectedDiagnosis.map(diag => diag.uuid);
    return Array.isArray(apiIcdCodeListData)
      ? apiIcdCodeListData
          .filter(item => !selectedDiagnosisUuids.includes(item.uuid))
          .map((item: any) => ({
            key: item.uuid || '',
            value: item.code + ' - ' + item.description,
          }))
      : [];
  };

  // Get selected diagnosis details for display
  const getSelectedDiagnosisOptions = () => {
    return selectedDiagnosis.map(diag => ({
      key: diag.uuid,
      value: diag.code + ' - ' + diag.description,
    }));
  };

  // Add diagnosis to selection (for CustomClinicSelect)
  const addDiagnosis = (diagnosisKey: string) => {
    if (!diagnosisKey) return;

    const selectedItem = Array.isArray(apiIcdCodeListData)
      ? apiIcdCodeListData.find((item: any) => item.uuid === diagnosisKey)
      : undefined;

    if (selectedItem && !selectedDiagnosis.find(diag => diag.uuid === diagnosisKey)) {
      setSelectedDiagnosis(prev => [
        ...prev,
        {
          uuid: selectedItem.uuid,
          code: selectedItem.code || '',
          description: selectedItem.description || '',
        },
      ]);
    }
  };

  // Remove diagnosis from selection (for CustomClinicSelect)
  const removeDiagnosis = (diagnosisKey: string) => {
    setSelectedDiagnosis(prev => prev.filter(diag => diag.uuid !== diagnosisKey));
  };

  // Helper functions for procedure codes (similar to add-edit-appt-types.tsx)
  const formatAllCodes = (allCodes: any) => {
    // Filter out already selected codes
    const filteredCodes = allCodes?.filter(
      (code: any) => !selectedProcedureCodes.includes(code.code)
    );

    return filteredCodes?.map((code: any) => ({
      key: code?.code,
      value: `${code?.code} - ${code?.description}`,
    }));
  };

  const getSelectedProcedureCodes = () => {
    if (!selectedProcedureCodes || selectedProcedureCodes.length === 0) return [];

    return selectedProcedureCodes?.map((key: string) => {
      const code = allCodes?.find((c: any) => c.code === key);
      return {
        key: key,
        value: code ? `${code?.code} - ${code?.description}` : key,
      };
    });
  };

  const handleAddProcedureCode = (codeKey: string) => {
    if (!selectedProcedureCodes.includes(codeKey)) {
      setSelectedProcedureCodes(prev => [...prev, codeKey]);

      // Update procedureCodeName array
      const selectedCode = allCodes?.find((c: any) => c.code === codeKey);
      if (selectedCode) {
        setProcedureCodeName(prev => [
          ...prev,
          `${selectedCode?.code} - ${selectedCode?.description}`,
        ]);
      }
    }
  };

  const handleRemoveProcedureCode = (codeKeyToRemove: string) => {
    setSelectedProcedureCodes(prev => prev.filter((key: string) => key !== codeKeyToRemove));

    // Update procedureCodeName by removing the code
    const removedCode = allCodes?.find((c: any) => c.code === codeKeyToRemove);
    if (removedCode) {
      setProcedureCodeName(prev => {
        const codeToRemove = `${removedCode?.code} - ${removedCode?.description}`;
        return prev.filter((code: string) => code !== codeToRemove);
      });
    }
  };

  // Helper functions for ICD codes
  const getAvailableIcdOptions = () => {
    const selectedIcdUuids = selectedIcdCodes;
    return Array.isArray(apiIcdCodeListData)
      ? apiIcdCodeListData
          .filter(item => !selectedIcdUuids.includes(item.uuid))
          .map((item: any) => ({
            key: item.uuid || '',
            value: item.code + ' - ' + item.description,
          }))
      : [];
  };

  const getSelectedIcdCodes = () => {
    return selectedIcdCodes.map(uuid => {
      const icdCode = Array.isArray(apiIcdCodeListData)
        ? apiIcdCodeListData.find((item: any) => item.uuid === uuid)
        : undefined;
      return {
        key: uuid,
        value: icdCode ? icdCode.code + ' - ' + icdCode.description : uuid,
      };
    });
  };

  const handleAddIcdCode = (codeKey: string) => {
    if (!selectedIcdCodes.includes(codeKey)) {
      setSelectedIcdCodes(prev => [...prev, codeKey]);

      // Update icdCodeName with comma-separated string
      const selectedIcdCode = Array.isArray(apiIcdCodeListData)
        ? apiIcdCodeListData.find((item: any) => item.uuid === codeKey)
        : undefined;
      if (selectedIcdCode) {
        setIcdCodeName(prev => {
          const currentCodes = prev ? prev.split(',').filter(code => code.trim() !== '') : [];
          const newCodes = [
            ...currentCodes,
            `${selectedIcdCode?.code} - ${selectedIcdCode?.description}`,
          ];
          return newCodes.join(',');
        });
      }
    }
  };

  const handleRemoveIcdCode = (codeKeyToRemove: string) => {
    setSelectedIcdCodes(prev => prev.filter((key: string) => key !== codeKeyToRemove));

    // Update icdCodeName by removing the code
    const removedIcdCode = Array.isArray(apiIcdCodeListData)
      ? apiIcdCodeListData.find((item: any) => item.uuid === codeKeyToRemove)
      : undefined;
    if (removedIcdCode) {
      setIcdCodeName(prev => {
        const currentCodes = prev ? prev.split(',').filter(code => code.trim() !== '') : [];
        const codeToRemove = `${removedIcdCode?.code} - ${removedIcdCode?.description}`;
        const filteredCodes = currentCodes.filter((code: string) => code !== codeToRemove);
        return filteredCodes.join(',');
      });
    }
  };

  const handleVitalDataChange = (newData: Partial<VitalFormData>) => {
    setVitalFormData(prev => ({
      ...prev,
      ...newData,
    }));
  };

  

  useApiFeedback(
    isErrorCreate,
    errorCreate,
    isSuccessCreate,
    (dataCreate?.message || 'Added Successfully') as string
  );

  useApiFeedback(
    isErrorUpdate,
    errorUpdate,
    isSuccessUpdate,
    (dataUpdate?.message || 'Updated Successfully') as string
  );

  const isPending = isCreating || isUpdating;

  // Show loader while data is being loaded in edit mode
  const isLoadingEditData = isEditMode && !isTemplateDataLoaded;

  useEffect(() => {
    if (isPending || isLoadingEditData) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isPending, isLoadingEditData, dispatch]);

  return (
    <Box
      sx={{
        pl: 1,
        pr: 1,
        backgroundColor: '#F5F5F5',
        maxHeight: '90vh',
        width: '100%',
        overflowY: 'scroll',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <BackArrowIcon color="Primary.main" onClick={handleCancel} style={{ cursor: 'pointer' }} />
        <Typography variant="bodyRegular3">
          {editForm ? VisitNotesEnum.EDIT_VISIT_NOTE : VisitNotesEnum.CREATE_VISIT_NOTE}
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={1}>
          <Grid size={6}>
            <CustomLabel label={VisitNotesEnum.TEMPLATE_NOTE_NAME} isRequired />
            <Controller
              control={control}
              name="templateName"
              render={({ field }) => (
                <CustomInput
                  {...field}
                  bgWhite
                  name="templateName"
                  placeholder={VisitNotesEnum.ENTER_TEMPLATE_NOTE_NAME}
                  hasError={!!errors.templateName}
                  errorMessage={errors.templateName?.message}
                />
              )}
            />
          </Grid>

          {isDataReady && (
            <Grid size={6}>
              <CustomLabel label={VisitNotesEnum.TEMPLATE_TYPE} isRequired />
              <Controller
                control={control}
                name="templateType"
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    bgWhite
                    isDisabled={editForm ? true : false}
                    name="templateType"
                    placeholder={VisitNotesEnum.SELECT_TEMPLATE_TYPE}
                    value={field.value || 'SOAP_NOTE'}
                    hasError={!!errors.templateType}
                    errorMessage={errors.templateType?.message}
                    items={templateTypeList}
                  />
                )}
              />
            </Grid>
          )}

          {isDataReady && isSimpleNote && (
            <Grid size={12} container spacing={1.5}>
              <Grid size={12}>
                <CustomLabel label={VisitNotesEnum.HISTORY_OF_PRESENT_ILLNESS} />
                <Box
                  sx={{
                    border: '1px solid #E0E0E0',
                    borderRadius: 1,
                    '& .ql-editor': {
                      fontFamily: 'sans-serif',
                    },
                  }}
                >
                  <ReactQuill
                    theme="snow"
                    value={historyOfPresentIllnessContent}
                    onChange={setHistoryOfPresentIllnessContent}
                    modules={modules}
                    formats={formats}
                    style={{
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                </Box>
              </Grid>

              <Grid size={12}>
                <CustomLabel label={VisitNotesEnum.FOLLOW_UP} />
                <Box
                  sx={{
                    border: '1px solid #E0E0E0',
                    borderRadius: 1,
                    '& .ql-editor': {
                      fontFamily: 'sans-serif',
                    },
                  }}
                >
                  <ReactQuill
                    theme="snow"
                    value={followUpContent}
                    onChange={setFollowUpContent}
                    modules={modules}
                    formats={formats}
                    style={{
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          )}
          {isDataReady && isSoapNote && (
            <>
              <Grid size={12} container spacing={1.5}>
                <Grid>
                  <Typography variant="bodyRegular3" color="Primary.main">
                    {VisitNotesEnum.CHIEF_COMPLAINT}
                  </Typography>
                </Grid>
                <Grid size={12} display="flex" flexDirection="column">
                  <Controller
                    control={control}
                    name="templateData.chiefComplaint"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        multiline
                        rows={2}
                        variant="outlined"
                        size="small"
                        sx={{ backgroundColor: 'Base.white' }}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid size={12}>
                <Grid display="flex" flexDirection="column" gap={1}>
                  <Typography variant="bodyRegular3" color="Primary.main">
                    {VisitNotesEnum.SUBJECTIVE}
                  </Typography>
                  <Box
                    sx={{
                      border: '1px solid #E0E0E0',
                      borderRadius: 1,
                      '& .ql-editor': {
                        fontFamily: 'sans-serif',
                      },
                    }}
                  >
                    <ReactQuill
                      theme="snow"
                      value={medicalHistoryContent}
                      onChange={setMedicalHistoryContent}
                      modules={modules}
                      formats={formats}
                      style={{
                        backgroundColor: '#FFFFFF',
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Grid size={12} gap={4} display="flex" flexDirection="row">
                <Grid size={6}>
                  <Grid display="flex" flexDirection="column" gap={1}>
                    <Typography variant="bodyRegular3" color="Primary.main">
                      {VisitNotesEnum.REVIEW_OF_SYSTEMS}
                    </Typography>
                    <Controller
                      control={control}
                      name="templateData.reviewOfSystems"
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          bgWhite
                          name="templateData.reviewOfSystems"
                          placeholder={VisitNotesEnum.SELECT_REVIEW_OF_SYSTEMS}
                          hasError={!!errors.templateData?.reviewOfSystems}
                          errorMessage={errors.templateData?.reviewOfSystems?.message}
                          value={field.value || ''}
                          items={
                            Array.isArray(reviewOfSystemsListData)
                              ? reviewOfSystemsListData?.map((item: any) => ({
                                  value: item.uuid,
                                  label: item.title,
                                }))
                              : []
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={12} mt={1.5}>
                    {reviewOfSystems && (
                      <Details
                        uuid={reviewOfSystems}
                        onDataChange={setRosQuestionsAnswer}
                        initialData={rosQuestionsAnswer}
                        editForm={editForm}
                        onOriginalDataChange={setOriginalRosData}
                      />
                    )}
                  </Grid>
                </Grid>

                <Grid size={6}>
                  <Grid display="flex" flexDirection="column" gap={1}>
                    <Typography variant="bodyRegular3" color="Primary.main">
                      {VisitNotesEnum.PHYSICAL_EXAM}
                    </Typography>
                    <Controller
                      control={control}
                      name="templateData.physicalExam"
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          bgWhite
                          name="templateData.physicalExam"
                          placeholder={VisitNotesEnum.SELECT_PHYSICAL_EXAM}
                          hasError={!!errors.templateData?.physicalExam}
                          errorMessage={errors.templateData?.physicalExam?.message}
                          value={field.value || ''}
                          items={
                            Array.isArray(physicalExamListData)
                              ? physicalExamListData?.map((item: any) => ({
                                  value: item.uuid,
                                  label: item.title,
                                }))
                              : []
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={12} mt={1.5}>
                    {physicalExam && (
                      <Details
                        uuid={physicalExam}
                        onDataChange={setPeQuestionsAnswer}
                        initialData={peQuestionsAnswer}
                        editForm={editForm}
                        onOriginalDataChange={setOriginalPeData}
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid size={12}>
                <Grid display="flex" flexDirection="column" gap={1}>
                  <Typography variant="bodyRegular3" color="Primary.main">
                    {VisitNotesEnum.OBJECTIVE}
                  </Typography>
                  <Box
                    sx={{
                      border: '1px solid #E0E0E0',
                      borderRadius: 1,
                      '& .ql-editor': {
                        fontFamily: 'sans-serif',
                      },
                    }}
                  >
                    <ReactQuill
                      theme="snow"
                      value={objectiveContent}
                      onChange={setObjectiveContent}
                      modules={modules}
                      formats={formats}
                      style={{
                        backgroundColor: '#FFFFFF',
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid size={12} gap={2}>
                <Typography variant="bodyRegular3" color="Primary.main" sx={{ mb: 2 }}>
                  {VisitNotesEnum.VITAL}
                </Typography>
                <Grid mt={1.5} size={12} display="flex" flexDirection="row" gap={2}>
                  <Controller
                    control={control}
                    name="templateData.vitals"
                    render={() => (
                      <>
                        <Grid size={6}>
                          <VitalTable
                            key={String(visitNoteTemplateData?.data?.uuid || 'new')}
                            onVitalDataChange={handleVitalDataChange}
                            control={control}
                            fieldsToShow={[
                              VisitNotesEnum.BLOOD_PRESSURE,
                              VisitNotesEnum.HEART_RATE,
                              VisitNotesEnum.BODY_TEMPERATURE,
                              VisitNotesEnum.RESPIRATORY_RATE_NOTE,
                            ]}
                          />
                        </Grid>
                        <Grid size={6}>
                          <VitalTable
                            key={String(visitNoteTemplateData?.data?.uuid || 'new')}
                            onVitalDataChange={handleVitalDataChange}
                            control={control}
                            fieldsToShow={[
                              VisitNotesEnum.WEIGHT,
                              VisitNotesEnum.HEIGHT,
                              VisitNotesEnum.PAIN,
                              VisitNotesEnum.OXYGEN_SATURATION_LEVEL,
                            ]}
                          />
                        </Grid>
                      </>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid size={12}>
                <Typography variant="bodyRegular3" color="Primary.main">
                  {VisitNotesEnum.ASSESSMENT}
                </Typography>{' '}
                <Box
                  sx={{
                    border: '1px solid #E0E0E0',
                    borderRadius: 1,
                    '& .ql-editor': {
                      fontFamily: 'sans-serif',
                    },
                  }}
                >
                  <ReactQuill
                    theme="snow"
                    value={assessmentContent}
                    onChange={setAssessmentContent}
                    modules={modules}
                    formats={formats}
                    style={{
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                </Box>
              </Grid>
              <Grid size={6}>
                <CustomLabel label={formConstants.PROCEDURE_CODE} />
                <CustomClinicSelect
                  placeholder={formConstants.SELECT_CODE}
                  options={formatAllCodes(allCodes)}
                  selectedValue={getSelectedProcedureCodes()}
                  onValueAdd={handleAddProcedureCode}
                  onValueRemove={handleRemoveProcedureCode}
                  noRecords
                  bgWhite
                />
              </Grid>
              <Grid size={6}>
                <CustomLabel label="ICD Code" />
                <CustomClinicSelect
                  placeholder={formConstants.SELECT_CODE}
                  options={getAvailableIcdOptions()}
                  selectedValue={getSelectedIcdCodes()}
                  onValueAdd={handleAddIcdCode}
                  onValueRemove={handleRemoveIcdCode}
                  noRecords
                  bgWhite
                />
              </Grid>
              <Grid size={12}>
                <Typography variant="bodyRegular3" color="Primary.main">
                  {VisitNotesEnum.MEDICATIONS}
                </Typography>{' '}
                <Box
                  sx={{
                    border: '1px solid #E0E0E0',
                    borderRadius: 1,
                    '& .ql-editor': {
                      fontFamily: 'sans-serif',
                    },
                  }}
                >
                  <ReactQuill
                    theme="snow"
                    value={medicationsContent}
                    onChange={setMedicationsContent}
                    modules={modules}
                    formats={formats}
                    style={{
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                </Box>
              </Grid>
              <Grid size={12}>
                <Typography variant="bodyRegular3" color="Primary.main">
                  {VisitNotesEnum.PLAN}
                </Typography>{' '}
                <Box
                  sx={{
                    border: '1px solid #E0E0E0',
                    borderRadius: 1,
                    '& .ql-editor': {
                      fontFamily: 'sans-serif',
                    },
                  }}
                >
                  <ReactQuill
                    theme="snow"
                    value={planContent}
                    onChange={setPlanContent}
                    modules={modules}
                    formats={formats}
                    style={{
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                </Box>
              </Grid>

              <Grid size={12}>
                <Typography variant="bodyRegular3" color="Primary.main">
                  {VisitNotesEnum.FOLLOW_UP}
                </Typography>{' '}
                <Box
                  sx={{
                    border: '1px solid #E0E0E0',
                    borderRadius: 1,
                    '& .ql-editor': {
                      fontFamily: 'sans-serif',
                    },
                  }}
                >
                  <ReactQuill
                    theme="snow"
                    value={followUpContent}
                    onChange={setFollowUpContent}
                    modules={modules}
                    formats={formats}
                    style={{
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                </Box>
              </Grid>
              <Grid size={12}>
                <Typography variant="bodyRegular3" color="Primary.main">
                  {VisitNotesEnum.CARE_PLAN}
                </Typography>{' '}
                <Box
                  sx={{
                    border: '1px solid #E0E0E0',
                    borderRadius: 1,
                    '& .ql-editor': {
                      fontFamily: 'sans-serif',
                    },
                  }}
                >
                  <ReactQuill
                    theme="snow"
                    value={carePlanContent}
                    onChange={setCarePlanContent}
                    modules={modules}
                    formats={formats}
                    style={{
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                </Box>
              </Grid>
              <Grid size={12}>
                <Typography variant="bodyRegular3" color="Primary.main">
                  {VisitNotesEnum.INSTRUCTIONS_NOTE}
                </Typography>{' '}
                <Box
                  sx={{
                    border: '1px solid #E0E0E0',
                    borderRadius: 1,
                    '& .ql-editor': {
                      fontFamily: 'sans-serif',
                    },
                  }}
                >
                  <ReactQuill
                    theme="snow"
                    value={instructionsNoteContent}
                    onChange={setInstructionsNoteContent}
                    modules={modules}
                    formats={formats}
                    style={{
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                </Box>
              </Grid>
            </>
          )}
          {isDataReady && isConsultationNote && (
            <Grid size={12}>
              <Grid size={6}>
                <CustomLabel label={VisitNotesEnum.DIAGNOSIS} />
                <Controller
                  control={control}
                  name="templateData.diagnosis"
                  render={({ field }) => (
                    <CustomClinicSelect
                      {...field}
                      options={getAvailableDiagnosisOptions()}
                      selectedValue={getSelectedDiagnosisOptions()}
                      onValueAdd={addDiagnosis}
                      onValueRemove={removeDiagnosis}
                      placeholder="Select diagnosis"
                      hasError={!!errors.templateData?.diagnosis}
                      errorMessage={(errors.templateData?.diagnosis?.message as string) || ''}
                      noRecords
                      bgWhite
                    />
                  )}
                />
              </Grid>
              <Grid size={12} mt={1.5}>
                <CustomLabel label={VisitNotesEnum.NOTE_CONTENT} />
                <Box
                  sx={{
                    border: '1px solid #E0E0E0',
                    borderRadius: 1,
                    '& .ql-editor': {
                      fontFamily: 'sans-serif',
                    },
                  }}
                >
                  <ReactQuill
                    theme="snow"
                    value={noteContent}
                    onChange={setNoteContent}
                    modules={modules}
                    formats={formats}
                    style={{
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          )}

          <Grid size={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
              <CustomButton
                variant="outlined"
                onClick={handleCancel}
                disabled={isSubmitting}
                label="Cancel"
              />
              <CustomButton
                variant="filled"
                type="submit"
                disabled={isSubmitting}
                label={isSubmitting ? 'Saving...' : isEdit ? 'Update Template' : 'Save Template'}
              />
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddVisitNotes;
