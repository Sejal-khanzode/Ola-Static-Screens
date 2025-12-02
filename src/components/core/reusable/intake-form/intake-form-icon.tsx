import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

export type IntakeFormStatus = "PENDING" | "SCHEDULED" | "COMPLETED";

const intakeFormColorMap = {
  PENDING: "Warning.50",
  SCHEDULED: "Neutral.60",
  COMPLETED: "Positive.50",
};

export const getIntakeFormColor = (status: IntakeFormStatus) => {
  return intakeFormColorMap[status] || intakeFormColorMap.PENDING;
};

const IntakeFormIcon = ({
  status = "PENDING",
}: {
  status?: IntakeFormStatus;
}) => {
  const color = getIntakeFormColor(status);
  return <DescriptionOutlinedIcon sx={{ color }} />;
};

export default IntakeFormIcon;
