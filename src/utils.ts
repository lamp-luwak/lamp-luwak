
export function isReactComponent(instance: any) {
  return instance && typeof instance === "object" && instance.isReactComponent;
}
