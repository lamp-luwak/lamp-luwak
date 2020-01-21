import { factory } from "@impress/ssr";
import { make, values } from "../store/lib";
import { assign, getInstances } from "../di/lib";

export const {
  serialize,
  unserialize,
  cleanup,
  register
} = factory(make, values, assign, getInstances);
