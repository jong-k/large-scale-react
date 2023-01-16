export const debounce = <F extends (...args: any[]) => any>(
  callback: F,
  delay: number,
) => {
  let timerId: number;
  return (...args: Parameters<F>) => {
    if (timerId > 0) clearTimeout(timerId);
    timerId = setTimeout(callback, delay, ...args);
  };
};
