import { Box, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill-new';
import { VisitNotesEnum } from 'src/constants/formConst';
import { formats, modules } from 'src/pages/apps/admin/pages/templates/visit-notes/AddVisitNotes';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import Details from 'src/pages/apps/admin/pages/templates/ros-pe-details/Details';
import VitalTable from 'src/pages/apps/admin/pages/templates/ros-pe-details/VitalTable';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import { formConstants } from 'src/constants/setting-constants';

const SoapNote = () => {
  const [medicalHistoryContent, setMedicalHistoryContent] = useState('');
  const [objectiveContent, setObjectiveContent] = useState('');
  const [planContent, setPlanContent] = useState('');
  const [assessmentContent, setAssessmentContent] = useState('');
  const [medicationsContent, setMedicationsContent] = useState('');
  const [followUpContent, setFollowUpContent] = useState('');
  
  const [_, setVitalFormData] = useState({
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
  const [rosQuestionsAnswer, setRosQuestionsAnswer] = useState<Record<string, any>>({});
  const [peQuestionsAnswer, setPeQuestionsAnswer] = useState<Record<string, any>>({});
  const [, setOriginalRosData] = useState<Record<string, any>>({});
  const [, setOriginalPeData] = useState<Record<string, any>>({});
  const [reviewOfSystems] = useState<string>('');
  const [physicalExam] = useState<string>('');
  const [reviewOfSystemsListData] = useState<any[]>([]);
  const [physicalExamListData] = useState<any[]>([]);
  const [editForm] = useState(false);
  const [visitNoteTemplateData] = useState<any>(null);
  const {
    control,
    formState: { errors },
    
  } = useForm({
    defaultValues: {
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

  const handleVitalDataChange = (newData: Partial<any>) => {
    setVitalFormData(prev => ({
      ...prev,
      ...newData,
    }));
  };

  return (
    <>
    <Grid container size={12}>
      <Grid size={12} container >
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
        {/* <CustomClinicSelect
        placeholder={formConstants.SELECT_CODE}
        options={allCodes}
        selectedValue={selectedProcedureCodes}
        onValueAdd={setSelectedProcedureCodes}
        onValueRemove={setSelectedProcedureCodes}
        noRecords
        bgWhite
      /> */}
      </Grid>
      <Grid size={6}>
        <CustomLabel label="ICD Code" />
        {/* <CustomClinicSelect
        placeholder={formConstants.SELECT_CODE}
        options={getAvailableIcdOptions()}
        selectedValue={getSelectedIcdCodes()}
        onValueAdd={handleAddIcdCode}
        onValueRemove={handleRemoveIcdCode}
        noRecords
        bgWhite
      /> */}
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
      </Grid>
    </>
  );
};

export default SoapNote;
