/* eslint-disable no-console */

export type LogLevel = "debug" | "info" | "warn" | "error";

const isEnabled = () => true;

export const logger = {
  debug: (...args: unknown[]) => {
    if (isEnabled()) console.debug(...args);
  },
  info: (...args: unknown[]) => {
    if (isEnabled()) console.info(...args);
  },
  warn: (...args: unknown[]) => {
    if (isEnabled()) console.warn(...args);
  },
  error: (...args: unknown[]) => {
    console.error(...args);
  },
};

export default logger;
