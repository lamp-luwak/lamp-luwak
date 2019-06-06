
export const ProvideKeys = Symbol("Provide property names");

export interface ProvideContainer {
  [ProvideKeys]?: string[];
}
