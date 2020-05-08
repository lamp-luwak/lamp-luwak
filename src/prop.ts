
export function prop(prop: PropertyKey, _default?: () => any) {
  const hasDefault = arguments.length == 2;
  return ((...args: any[]) => {
    const [ target, _value ] = args;
    if (args.length === 2) {
      return target[prop] = _value;
    }
    if (!target.hasOwnProperty(prop) && hasDefault) {
      target[prop] = _default!();
    }
    return target[prop];
  }) as ((target: any, _value?: any) => any);
}
