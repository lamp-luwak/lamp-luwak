import { isReactComponent, invalidateReactComponent, invalidReactVersionException } from "~/driver";

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

test("Should throw invalid react version exception", () => {
  expect(invalidReactVersionException).toThrowError("Necessary hooks are not exists in your React version");
});
