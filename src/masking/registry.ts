import type { MaskHandler, MaskId } from "./types";

export interface MaskRegistry {
  register(handler: MaskHandler): void;
  get(id: MaskId): MaskHandler | undefined;
  unregister(id: MaskId): void;
  list(): MaskId[];
}

export function createRegistry(): MaskRegistry {
  const map = new Map<MaskId, MaskHandler>();

  return {
    register(handler: MaskHandler) {
      map.set(handler.id, handler);
    },

    get(id: MaskId) {
      return map.get(id);
    },

    unregister(id: MaskId) {
      map.delete(id);
    },

    list() {
      return Array.from(map.keys());
    },
  };
}

export const defaultRegistry = createRegistry();
