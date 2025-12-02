import { Box, Typography } from "@mui/material";
import {
  StatusEnum,
  getBackgroundByType,
  getColorByType,
  statusLabels,
} from "../../../../models/chip";
import { chipStyle } from "./widgets/chipStyles";

interface ChipProps {
  type: StatusEnum;
}

function Chip(props: ChipProps) {
  const { type } = props;
  
  return (
    <Box
      sx={{ ...chipStyle, background: getBackgroundByType(type) }}
      color={getColorByType(type)}
    >
      <Typography variant="bodyRegular4">
        {statusLabels[type]}
      </Typography>
    </Box>
  );
}

export default Chip;
