import React, { Component } from "react";
import { Howl } from "howler";
import classnames from "classnames";
import {
  ButtonPanel,
  NameLabel,
  AudioList,
  ProgressBar,
  TimeLabel,
  VolumeBar
} from "./index";
import {
  AudioPlayerStyle,
  AudioPlayerBottomPart
} from "./AudioPlayer.module.scss";

class AudioPlayer extends Component {
  state = {
    isPlaying: false,
    isPause: false,
    isLoading: false,
    currentAudioItemIndex: -1,
    volume: 0.5
  };

  componentDidMount = () => {
    const audioItems = this.props.audioItems.map(audioItem => {
      if (!audioItem.start) return audioItem;

      const duration = audioItem.end - audioItem.start;
      const offset = audioItem.start;
      return {
        ...audioItem,
        sprite: {
          frame: [offset * 1000, duration * 1000, false]
        }
      };
    });
    this.setState({
      audioItems: audioItems,
      currentAudioItemIndex: 0
    });
  };

  componentDidUpdate = (prevProps, prevState, prevContext) => {
    if (
      this.state.isPlaying &&
      this.state.currentAudioItemIndex !== prevState.currentAudioItemIndex
    ) {
      this.initSoundObject();
    }
  };

  render = () => {
    if (this.state.currentAudioItemIndex === -1) return null;
    const audio = this.state.audioItems[this.state.currentAudioItemIndex];
    const audioItemCount = this.audioItemCount();
    var percent = 0;
    if (this.state.seek && this.state.duration) {
      percent = audio.sprite
        ? (this.state.seek - audio.sprite.frame[0] / 1000) / this.state.duration
        : this.state.seek / this.state.duration;
    }
    var topComponents = [
      <ButtonPanel
        isPlaying={this.state.isPlaying}
        isPause={this.state.isPause}
        isLoading={this.state.isLoading}
        onPlayBtnClick={this.onPlayBtnClick}
        onPauseBtnClick={this.onPauseBtnClick}
      />,
      <ProgressBar percent={percent} seekTo={this.seekTo} />,
      <VolumeBar
        volume={this.state.volume}
        adjustVolumeTo={this.adjustVolumeTo}
      />
    ];

    var audioItemName;
    if (audioItemCount > 1) {
      topComponents.push(
        <AudioList
          audioItems={this.state.audioItems}
          currentAudioItemIndex={this.state.currentAudioItemIndex}
          isPlaying={this.state.isPlaying}
          isPause={this.state.isPause}
          onAudioItemClick={this.onAudioItemClick}
        />
      );
      audioItemName =
        this.state.currentAudioItemIndex +
        1 +
        ". " +
        this.getCurrentAudioName();
    } else {
      audioItemName = this.getCurrentAudioName();
    }

    return (
      <div className={AudioPlayerStyle}>
        <div className="d-flex align-items-center">{topComponents}</div>
        <div className="d-flex align-items-center justify-content-between">
          <NameLabel name={audioItemName} />
          <TimeLabel
            seek={this.state.seek}
            duration={this.state.duration}
            sprite={audio.sprite}
          />
        </div>
      </div>
    );
  };

  onPlayBtnClick = () => {
    if (this.state.isPlaying && !this.state.isPause) {
      return;
    }
    this.play();
  };

  onPauseBtnClick = () => {
    var isPause = !this.state.isPause;
    this.setState({ isPause: isPause });
    isPause ? this.pause() : this.playHowler();
  };

  onPrevBtnClick = () => {
    this.prev();
  };

  onNextBtnClick = () => {
    this.next();
  };

  onAudioItemClick = audioIndex => {
    // handle pause/playing state.
    if (this.state.currentAudioItemIndex === audioIndex) {
      if (this.state.isPause) {
        this.onPauseBtnClick();
      } else if (!this.state.isPlaying) {
        this.onPlayBtnClick();
      }
      return;
    }

    // handle index change state, it must change to play.
    this.stop();
    this.clearSoundObject();
    this.setState({
      currentAudioItemIndex: audioIndex,
      duration: 0,
      isPlaying: true,
      isPause: false
    });
  };

  play = () => {
    this.setState({ isPlaying: true, isPause: false });

    if (!this.howler) {
      this.initSoundObject();
    } else {
      if (
        this.state.audioItems[this.state.currentAudioItemIndex].src !==
        this.howler._src
      ) {
        this.initSoundObject();
      } else {
        this.playHowler();
      }
    }
  };

  initSoundObject = () => {
    this.clearSoundObject();
    this.setState({ isLoading: true });
    const audio = this.state.audioItems[this.state.currentAudioItemIndex];
    var options = {
      src: audio.src,
      volume: this.state.volume,
      onload: this.initSoundObjectCompleted,
      onend: this.playEnd
    };
    if (audio.sprite) options.sprite = audio.sprite;
    this.howler = new Howl(options);
  };

  clearSoundObject = () => {
    if (this.howler) {
      this.howler.stop();
      this.howler = null;
    }
  };

  initSoundObjectCompleted = () => {
    const audio = this.state.audioItems[this.state.currentAudioItemIndex];

    this.playHowler();
    this.setState({
      duration: audio.sprite
        ? audio.sprite.frame[1] / 1000
        : this.howler.duration(),
      isLoading: false
    });
  };

  playHowler = () => {
    const audio = this.state.audioItems[this.state.currentAudioItemIndex];
    console.log(this.howler);
    if (audio.sprite) this.howler.play("frame");
    else this.howler.play();
    this.stopUpdateCurrentDuration();
    this.updateCurrentDuration();
    this.interval = setInterval(this.updateCurrentDuration, 1000);
  };

  playEnd = () => {
    console.log("playend");
    if (this.state.currentAudioItemIndex === this.state.audioItems.length - 1) {
      this.stop();
    } else {
      this.next();
    }
  };

  stop = () => {
    this.stopUpdateCurrentDuration();
    this.setState({ seek: 0, isPlaying: false });
  };

  pause = () => {
    this.howler.pause();
    this.stopUpdateCurrentDuration();
  };

  prev = () => {
    if (this.state.seek > 1 || this.state.currentAudioItemIndex === 0) {
      this.seekTo(0);
    } else {
      this.updateAudioItemIndex(this.state.currentAudioItemIndex - 1);
    }
  };

  next = () => {
    this.updateAudioItemIndex(this.state.currentAudioItemIndex + 1);
  };

  updateAudioItemIndex = index => {
    this.setState({
      currentAudioItemIndex: index,
      duration: 0
    });
    if (this.state.isPause) {
      this.stop();
      this.clearSoundObject();
    } else {
      this.stopUpdateCurrentDuration();
    }
  };

  updateCurrentDuration = () => {
    // bug: on intit, this.howler.seek() returns this.howler instead of seconds past
    var seek;
    if (this.howler._state !== "loaded" || this.howler._playLock) return;
    else seek = this.howler.seek();
    this.setState({ seek });
  };

  stopUpdateCurrentDuration = () => {
    clearInterval(this.interval);
  };

  seekTo = percent => {
    const audio = this.state.audioItems[this.state.currentAudioItemIndex];
    var seek = this.state.duration * percent;
    if (audio.sprite) seek = seek + audio.sprite.frame[0] / 1000;
    this.howler.seek(seek);
    this.setState({ seek: seek });
  };

  adjustVolumeTo = percent => {
    this.setState({ volume: percent });
    if (this.howler) {
      this.howler.volume(percent);
    }
  };

  audioItemCount = () => {
    return this.state.audioItems ? this.state.audioItems.length : 0;
  };

  getCurrentAudioName = () => {
    if (this.state.currentAudioItemIndex < 0) {
      return "";
    }
    var clip = this.state.audioItems[this.state.currentAudioItemIndex];
    return clip.name;
  };
}

export default AudioPlayer;
