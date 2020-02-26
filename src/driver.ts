import React from "react";

export type ReactNode = React.ReactNode;
export type PureComponent = React.PureComponent;
export type Component = React.Component;
export const PureComponent = React.PureComponent;
export const Component = React.Component;

/* istanbul ignore next line */
export const useState = React.useState || invalidReactVersionException;
/* istanbul ignore next line */
export const useEffect = React.useEffect || invalidReactVersionException;

export function isReactComponent(instance: any) {
  return instance && typeof instance === "object" && instance.isReactComponent;
}

export function invalidateReactComponent(target: any) {
  target.forceUpdate();
}

export function invalidReactVersionException() {
  throw new Error("Necessary hooks are not exists in your React version");
}
