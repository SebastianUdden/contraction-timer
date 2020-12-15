export const formatTime = (sec) => {
  const seconds = Math.floor(sec % 60);
  const minutes = Math.floor(sec / 60);
  const hours = Math.floor(minutes / 60);
  const ss = seconds > 9 ? seconds : `0${seconds}`;
  const mm = minutes > 9 ? minutes : `0${minutes}`;
  const hh = hours > 9 ? hours : `0${hours}`;
  return `${hh}:${mm}:${ss}`;
};
