import React from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { BtnLoading } from "./ButtonPanel.module.scss";

/**
 * Todo: add btns for going forward and backward 10s
 */

const ButtonPanel = ({
  isPlaying,
  isPause,
  isLoading,
  onPlayBtnClick,
  onPauseBtnClick
}) => {
  const isShowPlayBtn = !isPlaying || isPause;
  const buttonClickHandler = isShowPlayBtn ? onPlayBtnClick : onPauseBtnClick;
  var icon = isLoading ? faSyncAlt : isShowPlayBtn ? faPlay : faPause;

  return (
    <div className="btn-group" role="group" aria-label="First group">
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={buttonClickHandler}
      >
        <FontAwesomeIcon icon={icon} spin={isLoading} />
      </button>
    </div>
  );
};

export default ButtonPanel;
