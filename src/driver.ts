export { Component, PureComponent, ReactNode } from "react";
import React from "react";

export function isReactComponent(instance: any) {
  return instance && typeof instance === "object" && instance.isReactComponent;
}

export function invalidateReactComponent(target: any) {
  target.forceUpdate();
}

export function useInvalidateEffect(effect: any) {
  const { useState, useEffect } = React;
  if (!useState || !useEffect) {
    throw new Error("Necessary hooks are not exists in your React version");
  }
  const [, updateState] = useState();
  const invalidateReactComponent = () => updateState({});
  useEffect(() => effect(invalidateReactComponent));
}
