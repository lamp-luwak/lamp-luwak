
export function isReactComponent(instance: any) {
  return instance && typeof instance === "object" && instance.isReactComponent;
}

export function reactComponentInvalidate(target: any) {
  target.forceUpdate();
}
