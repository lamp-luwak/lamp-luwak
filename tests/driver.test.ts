import { isReactComponent, invalidateReactComponent, useInvalidateEffect } from "~/driver";
import React from "react";

test("Should work react component check", () => {
  expect(isReactComponent(null)).toBeFalsy();
  expect(isReactComponent({})).toBeFalsy();
  expect(isReactComponent({ isReactComponent: {} })).toBeTruthy();
});

test("Should work invalidate react component", () => {
  const spy = jest.fn();
  const mockComponent = {
    forceUpdate: spy
  };
  invalidateReactComponent(mockComponent);
  expect(spy).toBeCalled();
});

test("Should throw when mocks are not available", () => {
  const _useState = React.useState;
  (React as any).useState = null;
  expect(() => {
    useInvalidateEffect(() => void 0);
  }).toThrowError("Necessary hooks are not exists in your React version");
  React.useState = _useState;
  const _useEffect = React.useEffect;
  (React as any).useEffect = null;
  expect(() => {
    useInvalidateEffect(() => void 0);
  }).toThrowError("Necessary hooks are not exists in your React version");
  React.useEffect = _useEffect;
});

test("Should work invalidate effect hook", () => {
  const _useState = React.useState;
  const _useEffect = React.useEffect;

  const updateState = jest.fn();
  React.useState = jest.fn().mockReturnValue([0, updateState]);
  const registerUnsubscriber = jest.fn();
  React.useEffect = (fn: any) => registerUnsubscriber(fn());

  useInvalidateEffect((invalidate: any) => {
    invalidate();
    return 11;
  });

  expect(updateState).toHaveBeenCalledWith({});
  expect(registerUnsubscriber).toHaveBeenCalledWith(11);

  React.useState = _useState;
  React.useEffect = _useEffect;
});
