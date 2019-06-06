import { reset as provideReset } from "./provide/lib";
import { reset as ssrReset } from "./ssr/lib";

export function reset() {
  console.log("RESET");
  provideReset();
  ssrReset();
}
