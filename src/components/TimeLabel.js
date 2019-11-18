import React from "react";
import { secondsToTime } from "../mixins/TimeFormatterMixin";

const TimeLabel = ({ seek, duration, sprite }) => {
  if (!seek || !duration) return <span />;
  const current = secondsToTime(
    !!sprite ? seek - sprite.frame[0] / 1000 : seek
  );
  const overall = secondsToTime(duration);

  return (
    <span>
      {current} / {overall}
    </span>
  );
};

export default TimeLabel;
