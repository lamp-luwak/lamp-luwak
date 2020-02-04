import { reset as resetDi } from "~/di";
import { reset as resetStore } from "~/store";
import { reset as resetSsr } from "~/ssr";

export function reset() {
  resetDi();
  resetStore();
  resetSsr();
}
