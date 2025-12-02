import { Controller } from 'react-hook-form';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import CustomInput from '../../../../../../components/core/reusable/custom-input/custom-input';
import { tableBodyStyles } from '../../../../../../components/core/reusable/custom-table/widgets/tablestyles';
import { VitalHeader } from 'src/components/core/reusable/headers/all-headers';
import { EnhancedTableHead } from 'src/components/core/reusable/custom-table/custom-table';
import { VisitNotesEnum } from 'src/constants/formConst';

interface VitalData {
  id: string;
  name: string;
  unit: string;
  value?: string;
  note?: string;
  isBP?: boolean;
}

export interface VitalFormData {
  bloodPressureSystolic: string;
  bloodPressureDiastolic: string;
  heartRate: string;
  bodyTemperature: string;
  respiratoryRate: string;
  oxygenSaturationLevel: string;
  weight: string;
  height: string;
  pain: string;
  bloodPressureNote: string;
  heartRateNote: string;
  temperatureNote: string;
  respiratoryRateNote: string;
  oxygenSaturationNote: string;
  weightNote: string;
  heightNote: string;
  painNote: string;
}

interface VitalTableProps {
  data?: VitalData[];
  onVitalDataChange?: (vitalData: VitalFormData) => void;
  fieldsToShow?: string[];
  control?: any;
}

const allVitalData = [
  {
    id: '1',
    name: VisitNotesEnum.BLOOD_PRESSURE,
    field: 'bloodPressure',
    unit: 'mmHg',
    isBP: true,
  },
  { id: '2', name: VisitNotesEnum.HEART_RATE, field: 'heartRate', unit: 'bpm' },
  { id: '3', name: VisitNotesEnum.BODY_TEMPERATURE, field: 'bodyTemperature', unit: '°F' },
  { id: '4', name: VisitNotesEnum.RESPIRATORY_RATE_NOTE, field: 'respiratoryRate', unit: '/min' },
  { id: '5', name: VisitNotesEnum.WEIGHT, field: 'weight', unit: 'lbs' },
  { id: '6', name: VisitNotesEnum.HEIGHT, field: 'height', unit: 'in' },
  { id: '7', name: VisitNotesEnum.PAIN, field: 'pain', unit: 'scale 1-10' },
  {
    id: '8',
    name: VisitNotesEnum.OXYGEN_SATURATION_LEVEL,
    field: 'oxygenSaturationLevel',
    unit: '%',
  },
];
export default function VitalTable({
  control,
  fieldsToShow = [
    VisitNotesEnum.BLOOD_PRESSURE,
    VisitNotesEnum.HEART_RATE,
    VisitNotesEnum.BODY_TEMPERATURE,
    VisitNotesEnum.RESPIRATORY_RATE_NOTE,
    VisitNotesEnum.WEIGHT,
    VisitNotesEnum.HEIGHT,
    VisitNotesEnum.PAIN,
    VisitNotesEnum.OXYGEN_SATURATION_LEVEL,
  ],
}: VitalTableProps) {
  const filteredData = allVitalData.filter(vital => fieldsToShow.includes(vital.name));

  const renderValueInput = (vital: VitalData) => {
    if (vital.isBP) {
      return (
        <Box display="flex" gap={1} alignItems="center">
          <Controller
            control={control}
            name="templateData.vitals.bloodPressureSystolic"
            render={({ field }) => <CustomInput {...field} placeholder="Systolic" bgWhite />}
          />
          <Controller
            control={control}
            name="templateData.vitals.bloodPressureDiastolic"
            render={({ field }) => <CustomInput {...field} bgWhite placeholder="Diastolic" />}
          />
        </Box>
      );
    }

    const getFieldName = (vitalName: string) => {
      switch (vitalName) {
        case VisitNotesEnum.HEART_RATE:
          return 'heartRate';
        case VisitNotesEnum.BODY_TEMPERATURE:
          return 'bodyTemperature';
        case VisitNotesEnum.RESPIRATORY_RATE_NOTE:
          return 'respiratoryRate';
        case VisitNotesEnum.OXYGEN_SATURATION_LEVEL:
          return 'oxygenSaturationLevel';
        case VisitNotesEnum.WEIGHT:
          return 'weight';
        case VisitNotesEnum.HEIGHT:
          return 'height';

        case VisitNotesEnum.PAIN:
          return 'pain';
        default:
          return 'heartRate';
      }
    };

    const fieldName = getFieldName(vital.name) as keyof VitalFormData;

    return (
      <Controller
        control={control}
        name={`templateData.vitals.${fieldName}`}
        render={({ field }) => (
          <CustomInput
            bgWhite
            placeholder={`Enter ${vital.name.toLowerCase()}`}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    );
  };

  const renderNoteInput = (vital: VitalData) => {
    const getNoteFieldName = (vitalName: string) => {
      switch (vitalName) {
        case VisitNotesEnum.BLOOD_PRESSURE:
          return 'bloodPressureNote';
        case VisitNotesEnum.HEART_RATE:
          return 'heartRateNote';
        case VisitNotesEnum.BODY_TEMPERATURE:
          return 'temperatureNote';
        case VisitNotesEnum.RESPIRATORY_RATE_NOTE:
          return 'respiratoryRateNote';
        case VisitNotesEnum.OXYGEN_SATURATION_LEVEL:
          return 'oxygenSaturationNote';
        case VisitNotesEnum.WEIGHT:
          return 'weightNote';
        case VisitNotesEnum.HEIGHT:
          return 'heightNote';
        case VisitNotesEnum.BODY_MASS_INDEX:
          return 'bodyMassIndexNote';
        case VisitNotesEnum.PAIN:
          return 'painNote';
        default:
          return 'bloodPressureNote';
      }
    };

    const noteFieldName = getNoteFieldName(vital.name) as keyof VitalFormData;

    return (
      <Controller
        control={control}
        name={`templateData.vitals.${noteFieldName}`}
        render={({ field }) => (
          <CustomInput
            bgWhite
            placeholder="Add note"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    );
  };

  return (
    <Box>
      <TableContainer
        sx={{
          border: '1px solid #E0E0E0',
          borderRadius: '8px',
          overflowY: 'auto',
        }}
      >
        <Table sx={{ minWidth: '100%' }}>
          <EnhancedTableHead headCells={VitalHeader} rowCount={filteredData.length} />
          <TableBody>
            {filteredData.map(vital => (
              <TableRow
                key={vital.id}
                sx={{
                  background: 'white',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <TableCell sx={tableBodyStyles}>
                  <Typography variant="bodyMedium4">{vital.name}</Typography>{' '}
                  <Typography variant="bodyMedium4">( {vital.unit} )</Typography>
                </TableCell>
                <TableCell sx={tableBodyStyles} width="20%">
                  {renderValueInput(vital)}
                </TableCell>
                <TableCell>{renderNoteInput(vital)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
