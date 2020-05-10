import { reset as diReset } from "./di";
import { reset as ssrReset } from "./ssr";

export function reset() {
  diReset();
  ssrReset();
}
