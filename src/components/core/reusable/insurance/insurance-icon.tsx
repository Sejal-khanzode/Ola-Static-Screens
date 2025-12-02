import {Success,Failed } from "../../../../assets/icons/insurance";

export type InsuranceStatus = "COMPLETED" | "FAILED";

const InsuranceIcon = ({
  insurance = "FAILED",
}: {
  insurance?: InsuranceStatus;
}) => {
  switch (insurance) {case "FAILED":
      return <Failed />;
    case "COMPLETED":
      return <Success />;
    
    default:
      return <Failed />;
  }
};

export default InsuranceIcon;
