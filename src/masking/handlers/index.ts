import type { MaskHandler } from "../types";
import { defaultRegistry } from "../registry";
import { serialHandler } from "./serial";
import { phoneHandler } from "./phone";
import { currencyHandler } from "./currency";

// Register handlers by default so they're available when the library is imported
const handlers: MaskHandler[] = [serialHandler, phoneHandler, currencyHandler];
handlers.forEach((h) => {
  try {
    defaultRegistry.register(h);
  } catch {
    // ignore registration errors in unusual environments
  }
});

export { serialHandler } from "./serial";
export { phoneHandler } from "./phone";
export { currencyHandler } from "./currency";
