import { cleanup as cleanupDiCaches } from "./di/lib";
import { cleanup as cleanupStoreCaches } from "./store/lib";
import { cleanup as cleanupSsrCaches } from "./ssr/lib";

export function cleanup() {
  cleanupDiCaches();
  cleanupStoreCaches();
  cleanupSsrCaches();
}
