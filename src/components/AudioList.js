import React, { useState } from "react";
import AudioItem from "./AudioItem";

const AudioList = ({
  currentAudioItemIndex,
  isPlaying,
  isPause,
  audioItems,
  onAudioItemClick
}) => {
  const [open, setOpen] = useState(false);

  audioItems = audioItems.map((song, index) => {
    const name =
      audioItems.length > 1 ? `${index + 1}. ${song.name}` : song.name;
    const handleAudioItemClick = () => {
      onAudioItemClick(index);
      setOpen(false);
    };
    return (
      <AudioItem
        currentAudioItemIndex={currentAudioItemIndex}
        name={name}
        eventKey={index}
        isPlaying={isPlaying}
        isPause={isPause}
        onAudioItemClick={handleAudioItemClick}
      />
    );
  });

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        onClick={() => setOpen(!open)}
        type="button"
      ></button>
      {open ? (
        <div className="dropdown-menu" style={{ display: "block" }}>
          {audioItems}
        </div>
      ) : null}
    </div>
  );
};

export default AudioList;
