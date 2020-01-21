import { factory } from "@impress/ssr";
import { make, values } from "./store";
import { assign, getInstances } from "./di";

export const {
  serialize,
  unserialize,
  cleanup,
  register
} = factory(make, values, assign, getInstances);
