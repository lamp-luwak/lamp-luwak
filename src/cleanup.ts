import { cleanup as cleanupDi } from "~/di";
import { cleanup as cleanupStore } from "~/store";
import { cleanup as cleanupSsr } from "~/ssr";

export function cleanup() {
  cleanupDi();
  cleanupStore();
  cleanupSsr();
}
