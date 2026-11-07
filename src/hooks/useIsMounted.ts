import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Hydration-safe hook that returns false on the server and true on the client.
 * Uses useSyncExternalStore (the official React 18/19 pattern) to avoid
 * cascading renders and ESLint react-hooks/set-state-in-effect errors.
 */
export function useIsMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
