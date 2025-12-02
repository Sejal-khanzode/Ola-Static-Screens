import { getTimeZoneAbbreviation, getTimeZoneValue } from "src/utils/date-utils";

export function isTimeBetween(startTimeString: string, endTimeString: string) {
  const startTime = new Date(startTimeString);
  const endTime = new Date(endTimeString);

  const istStartTime = new Date(
    startTime.toLocaleString("en-US", {
      timeZone: getTimeZoneValue(getTimeZoneAbbreviation()),
    }),
  );
  const istEndTime = new Date(
    endTime.toLocaleString("en-US", {
      timeZone: getTimeZoneValue(getTimeZoneAbbreviation()),
    }),
  );

  const currentTime = new Date();

  return currentTime >= istStartTime && currentTime <= istEndTime;
}
