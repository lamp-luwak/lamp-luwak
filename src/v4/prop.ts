
export function prop(prop: PropertyKey, _default?: () => any) {
  return ((...args: any[]) => {
    const [ target, _value ] = args;
    if (args.length === 2) {
      return target[prop] = _value;
    }
    return target[prop] = target[prop] || (_default && _default());
  }) as ((target: any, _value?: any) => any);
}
