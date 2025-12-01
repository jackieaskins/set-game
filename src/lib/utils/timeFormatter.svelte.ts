const MILLISECONDS = 1000;
const SECONDS = MILLISECONDS * 60;
const MINUTES = SECONDS * 60;
const HOURS = MINUTES * 24;

function pad(num: number) {
  return num < 10 ? `0${String(num)}` : num;
}

function getTimeParts(time: number) {
  return {
    hours: Math.floor((time % HOURS) / MINUTES),
    minutes: Math.floor((time % MINUTES) / SECONDS),
    seconds: Math.floor((time % SECONDS) / MILLISECONDS),
  };
}

export function getShortTimeFormat(time: number): string {
  const { hours, minutes, seconds } = getTimeParts(time);

  return [
    hours > 0 ? `${String(hours)}:` : undefined,
    hours > 0 ? pad(minutes) : minutes,
    pad(seconds),
  ]
    .filter((val) => val != undefined)
    .join(":");
}

export function getFullTimeFormat(time: number): string {
  const { hours, minutes, seconds } = getTimeParts(time);

  return [hours, minutes, seconds].map(pad).join(":");
}
