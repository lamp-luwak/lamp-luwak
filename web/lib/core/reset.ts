import { instances } from "./decorators/provide";
import { index, dictionary } from "./decorators/ssr";
import { state } from "./init";

export function reset() {
  instances.clear();
  index.clear();
  dictionary.clear();
  state.clear();
}
