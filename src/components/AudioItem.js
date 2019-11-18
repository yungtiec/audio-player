import React from "react";
import classnames from "classnames";

const AudioItem = ({
  currentAudioItemIndex,
  eventKey,
  isPlaying,
  onAudioItemClick,
  name
}) => {
  var isSelected = currentAudioItemIndex === eventKey;

  return (
    <button
      className={classnames({
        "dropdown-item": true,
        active: isSelected
      })}
      type="button"
      onClick={onAudioItemClick}
    >
      {name}
    </button>
  );
};

export default AudioItem;
