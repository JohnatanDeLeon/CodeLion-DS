import type { MaskHandler } from "../types";
import { defaultRegistry } from "../registry";
import { phoneHandler } from "./phone";
import { currencyHandler } from "./currency";

// Register handlers by default so they're available when the library is imported
const handlers: MaskHandler[] = [phoneHandler, currencyHandler];
handlers.forEach((h) => {
  try {
    defaultRegistry.register(h);
  } catch {
    // ignore registration errors in unusual environments
  }
});

export { phoneHandler } from "./phone";
export { currencyHandler } from "./currency";
