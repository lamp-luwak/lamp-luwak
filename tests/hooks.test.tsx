/**
 * @jest-environment jsdom
*/
import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { useProvide, store, resolve } from "~/.";

test("Should update component", () => {
  class A {
    @store d = "D";
  }
  const C = () => {
    const a = useProvide(A);
    return <p>{a.d}</p>
  };
  const el = mount(<C/>);
  expect(el.find("p").text()).toBe("D");
  act(() => {
    resolve(A).d = "DD";
  })
  expect(el.find("p").text()).toBe("DD");
});

test("Should pass register unsubscriber for non store container", () => {
  const _useEffect = React.useEffect;
  const fn = jest.fn();
  React.useEffect = fn;

  class A { d = "D" }
  const C = () => <p>{useProvide(A).d}</p>;
  class B { @store d = "DD" }
  const D = () => <p>{useProvide(B).d}</p>;

  mount(<C/>);
  expect(fn).toBeCalledTimes(0);

  mount(<D/>);
  expect(fn).toBeCalledTimes(1);

  React.useEffect = _useEffect;
});
