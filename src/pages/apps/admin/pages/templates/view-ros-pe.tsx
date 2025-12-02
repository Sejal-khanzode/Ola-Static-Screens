import { Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { ClinicalTemplateService } from 'src/sdk/requests';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

interface DataViewProps {
  uuid: string;
}

const ViewRosAndPEDetails = (props: DataViewProps) => {
  const { uuid } = props;
  const dispatch = useDispatch();

  const { data: rosPEData, isLoading: isLoadingRosPE } = useQuery({
    queryKey: ['rosPEData', uuid],
    queryFn: () =>
      ClinicalTemplateService.getApiMasterClinicalTemplateByTemplateId({ templateId: uuid }),
  });

  useEffect(() => {
    if (isLoadingRosPE) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoadingRosPE]);

  const questionsAnswers = (rosPEData as any)?.data?.questionsAnswers;

  return (
    <Grid container sx={{ display: 'flex', gap: 1 }}>
      <Grid size={12} display={'flex'} gap={1}>
        <Grid size={{ xs: 2.5 }}>
          <Typography variant="bodyBold4" color="Neutral.60">
            Name
          </Typography>
        </Grid>
        <Grid>
          <Typography>:</Typography>
        </Grid>
        <Grid size={{ xs: 8 }}>
          <Typography variant="titleMedium4">{rosPEData?.data?.title as string}</Typography>
        </Grid>
      </Grid>
      <Grid mt={2}>
        <Typography variant="bodyBold3">Questions</Typography>
      </Grid>

      {questionsAnswers &&
        Object.entries(questionsAnswers).map(([key, value]: [string, any]) => (
          <Grid size={12} display={'flex'} gap={1}>
            <Grid size={{ xs: 2.5 }} key={key} sx={{ mb: 2, display: 'flex', gap: 2 }}>
              <Typography variant="bodyBold4" color="Neutral.60">
                <FiberManualRecordIcon
                  style={{
                    fontSize: 1,
                    marginRight: 8,
                  }}
                />
                {value.question}
              </Typography>
            </Grid>
            <Grid>
              <Typography>:</Typography>
            </Grid>
            <Grid size={{ xs: 7 }}>
              <Typography variant="titleMedium4">{value.answer || '-'}</Typography>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
};

export default ViewRosAndPEDetails;
