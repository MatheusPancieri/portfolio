export const FPS = 24;

// "mm:ss" or "hh:mm:ss" -> seconds
export const toSeconds = (duration) =>
  duration
    .split(":")
    .map(Number)
    .reduce((acc, n) => acc * 60 + n, 0);

const pad = (n) => String(Math.floor(n)).padStart(2, "0");

// seconds (+ optional frame) -> "HH:MM:SS:FF"
export const toTimecode = (seconds, frame = 0) =>
  `${pad(seconds / 3600)}:${pad((seconds % 3600) / 60)}:${pad(seconds % 60)}:${pad(frame)}`;
