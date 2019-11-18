import React, { useState, useRef } from "react";
import $ from "jquery";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeOff } from "@fortawesome/free-solid-svg-icons";
import {
  VolumeBarDefault,
  VolumeBarHide,
  VolumePercentContainer,
  VolumePercent
} from "./VolumeBar.module.scss";

const calcAndAdjustVolumeTo = ({ event, volumePercentEl, adjustVolumeTo }) => {
  var container = $(volumePercentEl.current);
  var containerStartY = container.offset().top;
  var percent = (event.clientY - containerStartY) / container.height();
  percent = 1 - percent;
  adjustVolumeTo(percent);
};

const VolumeBar = ({ volume, adjustVolumeTo }) => {
  const [hide, setHide] = useState(true);
  const volumnBarEl = useRef(null);
  const volumePercentEl = useRef(null);

  const percent = volume * 100;
  const style = { top: `${100 - percent}%` };
  const toggleIcon = volume === 0 ? faVolumeOff : faVolumeUp;

  return (
    <div ref={volumnBarEl}>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={() => setHide(!hide)}
      >
        <FontAwesomeIcon icon={toggleIcon} />
      </button>
      <div
        className={classnames({
          [VolumeBarDefault]: true,
          [VolumeBarHide]: hide
        })}
      >
        <div
          ref={volumePercentEl}
          className={VolumePercentContainer}
          onClick={event =>
            calcAndAdjustVolumeTo({ event, volumePercentEl, adjustVolumeTo })
          }
        >
          <div className={VolumePercent} style={style}></div>
        </div>
      </div>
    </div>
  );
};

export default VolumeBar;
