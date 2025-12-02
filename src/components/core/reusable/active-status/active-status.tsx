import React from "react";
import ActiveInactiveSwitch from "./custom-switch";
// import { StatusType } from "../enums-interfaces/enums";

export enum StatusType {
    TOGGLE_BTN = "Toggle Btn",
    TEXT = "Text",
  }

type Props = {
  status: boolean;
  type: StatusType;
  handleStatusChange: any;
  editData: any;
};

const Status = (props: Props) => {
  const { status, type, handleStatusChange, editData } = props;

  return (
    <React.Fragment key={"status"}>
      {(() => {
        switch (type) {
          case StatusType.TOGGLE_BTN:
            return (
              <ActiveInactiveSwitch
                state={status}
                onChange={(event: any) => {
                  handleStatusChange(editData, event);
                }}
              />
            );

          default:
            return <>{type}</>;
        }
      })()}
    </React.Fragment>
  );
};

export default Status;