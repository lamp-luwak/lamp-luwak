import { reset as resetDi } from "./di";
import { reset as resetSsr } from "./ssr";

export function reset() {
  resetDi();
  resetSsr();
}
