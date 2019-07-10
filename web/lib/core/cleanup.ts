import { cleanup as provideCleanup } from "./provide/lib";
import { cleanup as ssrCleanup } from "./ssr/lib";

export function cleanup() {
  provideCleanup();
  ssrCleanup();
}
