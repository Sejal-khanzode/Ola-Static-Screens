import {
  Box,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Input,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackArrowIcon } from 'src/assets/icons/backArrowIcon';
import { SearchIcon } from 'src/assets/icons/searchIcon';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { diagocode, proceCode } from 'src/components/core/reusable/headers/all-headers';
import { getCurrentDate } from 'src/constants/date-format';
import { LocationControllerService } from 'src/sdk/requests';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import rupay from 'src/assets/images/rupay.png';
import mastercard from 'src/assets/images/mastercard.png';
import visa from 'src/assets/images/visa.png';

const mockdata = [
  {
    srn: 1,
    icd: 'F90.0 ADHD, predominantly inattentive type.',
    action: [{ label: 'Delete', route: 'delete' }],
  },
  { srn: 2, icd: 'F40.1 Social phobia', action: [{ label: 'Delete', route: 'delete' }] },
];

type ProcedureRow = {
  srn: number;
  procedure: string;
  modifiers: string[];
  units: string;
  amount: string;
  subtotal: string;
};

const CreateSuperbill = () => {
  const navigate = useNavigate();
  const clinicId = getDataFromLocalStorage('selectedClinicUuid');
  const [selectedLocation] = useState<string>('');
  const [procedureRows, setProcedureRows] = useState<ProcedureRow[]>([
    {
      srn: 1,
      procedure: '90837 Psychotherapy',
      modifiers: ['', '', '', ''],
      units: '',
      amount: '',
      subtotal: '',
    },
    {
      srn: 2,
      procedure: 'F90791 Psychiatric diagnostic evaluation',
      modifiers: ['', '', '', ''],
      units: '',
      amount: '',
      subtotal: '',
    },
  ]);

  const procedureTableData = procedureRows.map((row, index) => ({
    srn: row.srn,
    procedure: row.procedure,
    modifiers: (
      <Grid display="flex" gap={1}>
        {row.modifiers.map((m, mIndex) => (
          <CustomInput
            key={mIndex}
            value={m}
            onChange={e => {
              const updated = [...row.modifiers];
              updated[mIndex] = e.target.value;

              const newRows = [...procedureRows];
              newRows[index].modifiers = updated;
              setProcedureRows(newRows);
            }}
          />
        ))}
      </Grid>
    ),
    units: <CustomInput value={row.units} />,
    amount: <CustomInput value={row.amount} />,
    subtotal: <CustomInput value={row.subtotal} />,
    action: [{ label: 'Delete', route: 'delete' }],
  }));

  const totalAmount = procedureRows.reduce((sum, row) => sum + Number(row.subtotal || 0), 0);

  const { data: locationData } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () =>
      LocationControllerService.getApiMasterLocation({
        clinicId: clinicId as string,
      }),
  });

  const locations = (locationData?.data?.content ?? []) as any[];

  const handleBackToBilling = () => {
    navigate('/provider/billing/superbill');
  };
  return (
    <Grid container size={12}>
      <Grid size={{ xs: 12 }}>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ cursor: 'pointer' }}
          onClick={handleBackToBilling}
        >
          <BackArrowIcon color="Primary.main" />
          <Typography variant="bodyRegular3">Create Super Bill</Typography>
        </Box>
      </Grid>

      <Grid size={12}>
        <Grid size={{ xs: 12, md: 9 }}>
          <Box bgcolor="white" p={2} borderRadius={1} sx={{ height: '89vh', overflowY: 'auto' }}>
            <Grid size={12} display={'flex'}>
              <Grid size={1.5} display="flex" flexDirection="column">
                <Typography variant="bodyMedium4">Billing Provider</Typography>
                <Typography variant="bodyMedium4">Rendering Provider</Typography>
              </Grid>
              <Grid size={11} display="flex" flexDirection="column">
                <Typography variant="bodyMedium4" color="Neutral.70">
                  : John Due
                </Typography>
                <Typography variant="bodyMedium4" color="Neutral.70">
                  : Cameron James
                </Typography>
              </Grid>
            </Grid>
            <Grid size={12} mt={1}>
              <Typography variant="bodyMedium4">Service Details</Typography>
            </Grid>
            <Grid size={12} display={'flex'} gap={2}>
              <Grid size={2}>
                <CustomLabel label="Service Location" />
                <CustomSelect
                  placeholder="Select Location"
                  items={(locations ?? []).map((loc: any) => ({
                    value: loc.uuid,
                    label: loc.name,
                  }))}
                  value={selectedLocation}
                />
              </Grid>
              <Grid size={2}>
                <Grid>
                  <CustomLabel label="Date of Service" />
                  <CustomDatePicker value={getCurrentDate()} />
                </Grid>
              </Grid>
            </Grid>
            <Grid size={12} mt={1.5}>
              <Grid size={12} justifyContent={'space-between'} display={'flex'} mb={1}>
                <Grid size={3}>
                  <Typography variant="bodyMedium4">Diagnosis Code</Typography>
                </Grid>
                <Grid size={2.5}>
                  <CustomInput
                    placeholder="Search & Add Diagnosis Code"
                    showIcon={<SearchIcon />}
                  />
                </Grid>
              </Grid>
              <Grid size={12}>
                <CustomisedTable headCells={diagocode} tableData={mockdata} />
              </Grid>
            </Grid>
            <Grid size={12} alignItems="center" mt={1.5} display={'flex'} gap={2}>
              <Grid size={1.2}>
                <Typography variant="bodyMedium4">Patient Payment</Typography>
              </Grid>

              <Grid size={6}>
                <FormControl>
                  <RadioGroup row>
                    <FormControlLabel
                      value="false"
                      control={<Radio size="small" />}
                      label="Self Pay"
                    />
                    <FormControlLabel
                      value="true"
                      control={<Radio size="small" />}
                      label="Insurance"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid size={12} mt={1.5}>
              <Grid size={12} justifyContent={'space-between'} display={'flex'} mb={1}>
                <Grid size={3}>
                  <Typography variant="bodyMedium4">Procedure Code</Typography>
                </Grid>
                <Grid size={2.5}>
                  <CustomInput
                    placeholder="Search & Add Procedure Code"
                    showIcon={<SearchIcon />}
                  />
                </Grid>
              </Grid>
              <Grid size={12}>
                <CustomisedTable headCells={proceCode} tableData={procedureTableData} />
              </Grid>
              <Grid size={12} justifyItems={'end'} mt={1}>
                <Box sx={{ display: 'flex', bgcolor: 'Primary.0', p: 1, borderRadius: 1 }}>
                  <Typography mt={0.7}>Total :</Typography>
                  <Box p={1} ml={3} bgcolor={'Base.white'}>
                    $ {totalAmount}
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid size={12}>
              <Typography variant="bodyMedium4">Billing Note</Typography>
              <CustomInput placeholder="Enter Note" />
            </Grid>
            <Grid size={12} mt={1} display="flex" justifyContent="flex-end">
              <CustomButton label="Save Bill" variant="outlined" />
            </Grid>

            <Grid size={12} mt={3}>
              <Box
                sx={{
                  bgcolor: 'Neutral.10',
                  p: 3,
                  borderRadius: 2,
                }}
              >
                <Typography variant="bodyMedium4">Patient Co-pay</Typography>

                <Grid container mt={2} spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }} display={'flex'}>
                    <Grid size={4} display={'flex'} gap={0.5} flexDirection={'column'}>
                      <Typography variant="bodyRegular4" color="Neutral.70">
                        Current Bill Amount
                      </Typography>
                      <Typography variant="bodyRegular4" color="Neutral.70">
                        Estimated Amount ($){' '}
                      </Typography>
                      <Typography variant="bodyRegular4" color="Neutral.70" mt={0.8}>
                        Patient Balance
                      </Typography>
                      <Typography variant="bodyRegular4" color="Neutral.70">
                        Patient Co-pay
                      </Typography>
                    </Grid>
                    <Grid size={8} gap={0.2} display={'flex'} flexDirection={'column'}>
                      <Typography variant="bodyRegular4">: $800</Typography>
                      <Box>
                        :{' '}
                        <Input
                          sx={{
                            width: '100px',
                            textDecoration: 'none',
                            border: '1px solid',
                            borderColor: 'Primary.main',
                            borderRadius: 1,
                            height: '30px',
                            p: 1,
                            bgcolor: 'Base.white',
                          }}
                        />
                      </Box>
                      <Typography variant="bodyRegular4" mt={0.2}>
                        : $150
                      </Typography>
                      <Typography variant="bodyRegular4" mt={0.3}>
                        : $250
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid size={12}>
              <FormControl>
                <RadioGroup>
                  <FormControlLabel
                    value="invoice"
                    control={<Radio size="small" />}
                    label="Send Invoice"
                  />
                  <FormControlLabel
                    value="cards"
                    control={<Radio size="small" />}
                    label="Payment Cards"
                  />

                  <Box ml={4} mt={1}>
                    <FormControlLabel
                      value="card1"
                      control={<Radio size="small" />}
                      label={
                        <Box display="flex" alignItems="center" gap={1}>
                          <img src={visa} width={35} />
                          ****9583
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="card2"
                      control={<Radio size="small" />}
                      label={
                        <Box display="flex" alignItems="center" gap={1}>
                          <img src={rupay} width={35} />
                          ****5845
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="card3"
                      control={<Radio size="small" />}
                      label={
                        <Box display="flex" alignItems="center" gap={1}>
                          <img src={mastercard} width={35} />
                          ****0325
                        </Box>
                      }
                    />
                  </Box>

                  <FormControlLabel
                    value="manual"
                    control={<Radio size="small" />}
                    label="Manual Payment"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid size={{ xs: 12, md: 3 }}>
                <CustomLabel label="Payment Mode" />
                <CustomSelect
                  placeholder="Select Payment Mode"
                  items={(locations ?? []).map((loc: any) => ({
                    value: loc.uuid,
                    label: loc.name,
                  }))}
                  value=""
                />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <CustomLabel label="Check/Card Number" />
                <CustomInput placeholder="Enter Check Number" />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <CustomLabel label="Transaction ID" />
                <CustomInput placeholder="Enter Transaction ID" />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <CustomLabel label="Payment Amount ($)" />
                <CustomInput placeholder="Enter Payment Amount" />
              </Grid>
            </Grid>

            <Grid size={12} mt={2}>
              <CustomLabel label="Payment Note Mode" />
              <CustomInput placeholder="Enter Payment Note" />
            </Grid>

            <Grid size={12} mt={2}>
              <CustomButton label="Collect Payment" variant="outlined" />
            </Grid>

            <Grid
              size={12}
              borderTop={'1px solid'}
              borderColor={'Neutral.40'}
              mt={2}
              pt={2}
              display="flex"
              justifyContent="end"
            >
              <CustomButton label="Ready to Claim" variant="filled" />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateSuperbill;
