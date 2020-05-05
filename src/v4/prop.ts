
export function prop(target: any, prop: PropertyKey, _default?: any) {
  return target[prop] = target[prop] || _default;
}
