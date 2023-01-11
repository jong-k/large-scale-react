import { ChangeEvent } from "react";

export const debounce = (callback: Function, delay: number) => {
  let timerId = Number.MIN_SAFE_INTEGER;
  return (event: ChangeEvent) => {
    if (timerId > 0) clearTimeout(timerId);
    timerId = setTimeout(callback, delay, event);
  };
};
