import InsuranceIcon, { InsuranceStatus } from "./insurance-icon";

interface InsuranceProps {
  insurance?: InsuranceStatus;
}

const Insurance = ({ insurance = "COMPLETED" }: InsuranceProps) => {
  return (
    <div>
      <InsuranceIcon insurance={insurance} />
    </div>
  );
};

export default Insurance;




