import { Grid, Typography, Box, ListItem, List } from '@mui/material';
import { useVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateByTemplateId } from 'src/sdk/queries';
import { templateConstants } from 'src/constants/setting-constants';
import { VisitNotesEnum } from 'src/constants/formConst';

interface DataViewProps {
  uuid: string;
}

const ViewVisitNoteDetails = (props: DataViewProps) => {
  const { uuid } = props;

  const { data: dataView } = useVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateByTemplateId({
    templateId: uuid,
  });
  const data = dataView?.data;
  const templateData = data?.templateData as any;

  const templateType = data?.templateType;
  const formatTemplateType = (type: string) => {
    if (type === 'SIMPLE_NOTE') {
      return VisitNotesEnum.SIMPLE_NOTE;
    } else if (type === 'CONSULTATION_NOTE') {
      return VisitNotesEnum.CONSULTATION_NOTE;
    } else if (type === 'SOAP_NOTE') {
      return VisitNotesEnum.SOAP_NOTE;
    }
  };

  const getTemplateFields = () => {
    if (templateType === 'SIMPLE_NOTE') {
      return [
        {
          label: VisitNotesEnum.HISTORY_OF_PRESENT_ILLNESS,
          value: templateData?.historyOfPresentIllness,
        },
        { label: VisitNotesEnum.FOLLOW_UP, value: templateData?.followUp },
      ];
    } else if (templateType === 'CONSULTATION_NOTE') {
      return [
        {
          label: VisitNotesEnum.DIAGNOSIS,
          value: templateData?.diagnosis,
        },
        {
          label: VisitNotesEnum.NOTE_CONTENT,
          value: templateData?.noteContent,
        },
      ];
    } else {
      return [
        { label: VisitNotesEnum.CHIEF_COMPLAINT, value: templateData?.chiefComplaint },
        { label: VisitNotesEnum.SUBJECTIVE, value: templateData?.subjective },
        { label: VisitNotesEnum.OBJECTIVE, value: templateData?.objective },
        { label: VisitNotesEnum.ASSESSMENT, value: templateData?.assessment },
        { label: VisitNotesEnum.MEDICATIONS, value: templateData?.medications },
        { label: VisitNotesEnum.PLAN, value: templateData?.plan },
        { label: VisitNotesEnum.CARE_PLAN, value: templateData?.carePlan },
        { label: VisitNotesEnum.FOLLOW_UP, value: templateData?.followUp },
        { label: VisitNotesEnum.INSTRUCTIONS_NOTE, value: templateData?.instructionsNote },
      ];
    }
  };

  const templateDataFields = getTemplateFields();

  const basicInfoFields = [
    { label: VisitNotesEnum.TEMPLATE_NOTE_NAME, value: data?.templateName },
    {
      label: VisitNotesEnum.TEMPLATE_TYPE,
      value: formatTemplateType(data?.templateType as string),
    },
  ];

  const vitals = [
    {
      label: VisitNotesEnum.WEIGHT,
      value: templateData?.vitals?.weight || '-',
    },
    {
      label: VisitNotesEnum.WEIGHT_NOTE,
      value: templateData?.vitals?.weightNote || '-',
    },
    {
      label: VisitNotesEnum.HEIGHT,
      value: templateData?.vitals?.height || '-',
    },
    {
      label: VisitNotesEnum.HEIGHT_NOTE,
      value: templateData?.vitals?.heightNote || '-',
    },
    {
      label: VisitNotesEnum.BLOOD_PRESSURE,
      value:
        `${templateData?.vitals?.bloodPressureSystolic || '-'} / ${templateData?.vitals?.bloodPressureDiastolic || '-'}` ||
        '-',
    },
    {
      label: VisitNotesEnum.BLOOD_PRESSURE_NOTE,
      value: templateData?.vitals?.bloodPressureNote || '-',
    },
    {
      label: VisitNotesEnum.PAIN,
      value: templateData?.vitals?.pain || '-',
    },
    {
      label: VisitNotesEnum.PAIN_NOTE,
      value: templateData?.vitals?.painNote || '-',
    },
    {
      label: VisitNotesEnum.BODY_TEMPERATURE,
      value: templateData?.vitals?.bodyTemperature || '-',
    },
    {
      label: VisitNotesEnum.TEMPERATURE_NOTE,
      value: templateData?.vitals?.temperatureNote || '-',
    },
    {
      label: VisitNotesEnum.HEART_RATE,
      value: templateData?.vitals?.heartRate || '-',
    },
    {
      label: VisitNotesEnum.HEART_RATE_NOTE,
      value: templateData?.vitals?.heartRateNote || '-',
    },
    {
      label: VisitNotesEnum.RESPIRATORY_RATE_NOTE,
      value: templateData?.vitals?.respiratoryRate || '-',
    },
    {
      label: VisitNotesEnum.RESPIRATORY_RATE_NOTE,
      value: templateData?.vitals?.respiratoryRateNote || '-',
    },
  ];
  return (
    <Grid container spacing={3}>
      {/* Basic Information - Always show */}
      <Grid size={{ xs: 12 }}>
        <Grid container spacing={2}>
          {basicInfoFields.map((field, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Grid container alignItems="center">
                <Grid size={{ xs: 5 }}>
                  <Typography variant="bodyBold4" color="Neutral.60">
                    {field.label}:
                  </Typography>
                </Grid>
                <Grid size={{ xs: 7 }}>
                  <Typography variant="titleMedium4">{field.value as string}</Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Grid container spacing={2}>
          {templateType === 'SOAP_NOTE' && (
            <>
              {templateData?.rosQuestionAnswer && (
                <Grid size={{ xs: 12 }}>
                  <Typography variant="bodyBold3" color="Primary.main">
                    {templateConstants.REVIEW_OF_SYSTEMS}
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(templateData.rosQuestionAnswer).map(([key, obj]: any) => (
                      <Grid
                        size={{ xs: 12, md: 6 }}
                        key={key}
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        <Grid size={{ xs: 5 }}>
                          <Typography variant="bodyBold4" color="Neutral.60">
                            {obj.question}:
                          </Typography>
                        </Grid>
                        <Grid>
                          <Typography variant="body2">{obj.answer}</Typography>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}

              {templateData?.peQuestionsAnswer && (
                <Grid size={{ xs: 12 }}>
                  <Typography variant="bodyBold3" color="Primary.main">
                    {templateConstants.PHYSICAL_EXAM}
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(templateData.peQuestionsAnswer).map(([key, obj]: any) => (
                      <Grid size={{ xs: 12, md: 6 }} key={key} display="flex" flexDirection="row">
                        <Grid size={{ xs: 5 }}>
                          <Typography variant="bodyBold4" color="Neutral.60">
                            {obj.question}:
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 7 }}>
                          <Typography variant="body2">{obj.answer}</Typography>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}

              {templateData?.vitals && (
                <Grid size={{ xs: 12 }}>
                  <Typography variant="bodyBold3" color="Primary.main">
                    {templateConstants.VITALS}
                  </Typography>
                  <Grid container spacing={2}>
                    {vitals.map((field, index) => (
                      <Grid size={{ xs: 12, md: 6 }} key={index} display="flex" flexDirection="row">
                        <Grid size={{ xs: 5.5 }}>
                          <Typography variant="bodyBold4" color="text.secondary">
                            {field.label}:
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 6.5 }}>
                          <Typography variant="body2">{field.value}</Typography>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}

              {/* Procedure Codes Section */}
              {templateData?.procedureCodeName && (
                <Grid size={{ xs: 12 }}>
                  <Typography variant="bodyBold3" color="Primary.main">
                    {templateConstants.PROCEDURE_CODES}
                  </Typography>
                  <Box>
                    <List sx={{ listStyleType: 'disc', pl: 3 }}>
                      {(() => {
                        // Handle both array and string formats
                        const codes = Array.isArray(templateData.procedureCodeName)
                          ? templateData.procedureCodeName
                          : templateData.procedureCodeName
                              .split(',')
                              .filter((code: string) => code.trim() !== '')
                              .map((code: string) => code.trim());

                        return codes.map((code: string, idx: number) => (
                          <ListItem key={idx} sx={{ display: 'list-item', py: 0 }}>
                            <Typography variant="body2">{code}</Typography>
                          </ListItem>
                        ));
                      })()}
                    </List>
                  </Box>
                </Grid>
              )}

              {/* ICD Codes Section */}
              {templateData?.icdCodeName && (
                <Grid size={{ xs: 12 }}>
                  <Typography variant="bodyBold3" color="Primary.main">
                    {templateConstants.ICD_CODES}
                  </Typography>
                  <Box>
                    <List sx={{ listStyleType: 'disc', pl: 3 }}>
                      {templateData.icdCodeName
                        .split(',')
                        .filter((code: string) => code.trim() !== '')
                        .filter((code: string) => {
                          // Filter out codes containing "unspecified" as a single word
                          const lowerCode = code.toLowerCase();
                          return !/\bunspecified\b/.test(lowerCode);
                        })
                        .map((code: string, idx: number) => (
                          <ListItem key={idx} sx={{ display: 'list-item', py: 0 }}>
                            <Typography variant="body2">{code.trim()}</Typography>
                          </ListItem>
                        ))}
                    </List>
                  </Box>
                </Grid>
              )}
            </>
          )}

          <Grid container>
            {templateDataFields.map((field, index) => (
              <Grid size={templateType === 'SOAP_NOTE' ? 6 : 12} key={index}>
                <Typography variant="bodyBold3" color="Primary.main" sx={{ mb: 1 }}>
                  {field.label}:
                </Typography>
                {field.label === 'Diagnosis' ? (
                  <Box display="flex" flexDirection="column" gap={0.5}>
                    <List sx={{ listStyleType: 'disc', pl: 3 }}>
                      {templateData?.diagnosis?.map((d: any, idx: number) => (
                        <ListItem key={idx} sx={{ display: 'list-item', py: 0 }}>
                          <Typography variant="body2">
                            {d.code} - {d.description}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ) : (
                  <Box sx={{ mb: 2 }}>
                    <Box>
                      {field.value ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: field.value }}
                          style={{
                            fontSize: '14px',
                            lineHeight: '1.5',
                            color: '#333',
                            fontFamily: 'Roboto',
                          }}
                        />
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          -
                        </Typography>
                      )}
                    </Box>
                  </Box>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ViewVisitNoteDetails;
