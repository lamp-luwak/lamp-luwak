import { reset as resetDi } from "./di";
import { reset as resetSsr } from "./ssr";

export const reset = () => {
  resetDi();
  resetSsr();
};
