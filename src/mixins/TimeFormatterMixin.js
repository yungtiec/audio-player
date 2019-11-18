export const timeUnitFormat = time => {
  if (time < 1) {
    return "00";
  } else if (time < 10) {
    return "0" + time;
  } else {
    return time;
  }
};

export const secondsToTime = secs => {
  secs = Math.round(secs);
  var hours = Math.floor(secs / (60 * 60));

  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);

  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds = Math.ceil(divisor_for_seconds);

  var time = "";

  if (hours > 0) {
    time += hours + ":";
  }

  time += timeUnitFormat(minutes) + ":";
  time += timeUnitFormat(seconds);
  return time;
};

export const stringToSeconds = str => {
  var parts = str.split(":"),
    minutes = +parts[0],
    seconds = +parts[1];
  return minutes * 60 + seconds;
};
