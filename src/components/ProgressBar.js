import React, { useRef } from "react";
import $ from "jquery";
import classnames from "classnames";
import {
  ProgressContainer,
  ProgressContainerShorter,
  Progress
} from "./ProgressBar.module.scss";

const calcAndSeekTo = ({ event, audioPercent, progressBarEl, seekTo }) => {
  if (!audioPercent) {
    return;
  }
  var container = $(progressBarEl.current);
  var containerStartX = container.offset().left;
  var progressBarPercent =
    (event.clientX - containerStartX) / container.width();
  progressBarPercent = progressBarPercent >= 1 ? 1 : progressBarPercent;
  seekTo(progressBarPercent);
};

const ProgressBar = ({ percent, seekTo, shorter }) => {
  const progressBarEl = useRef(null);
  const style = { width: `${percent * 100}%` };

  return (
    <div
      ref={progressBarEl}
      className={classnames(ProgressContainer, {
        [ProgressContainerShorter]: shorter
      })}
      onClick={event =>
        calcAndSeekTo({ event, audioPercent: percent, progressBarEl, seekTo })
      }
    >
      <div className={Progress} style={style}></div>
    </div>
  );
};

export default ProgressBar;
