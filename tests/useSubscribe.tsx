/**
 * @jest-environment jsdom
*/
import React, { useMemo } from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { provide, create, useProvide, useSubscribe } from "../src";

test("Should update component with useProvide", () => {
  class A {
    store = "D";
  }
  const C = () => {
    const a = useProvide(A);
    return <p>{a.store}</p>
  };
  const el = mount(<C/>);
  expect(el.find("p").text()).toBe("D");
  act(() => {
    provide(A).store = "DD";
  })
  expect(el.find("p").text()).toBe("DD");
});

test("Should update component with useSubscribe", () => {
  class A {
    store = "D";
  }
  const C = () => {
    const a = useMemo(() => create(A), []);
    useSubscribe(a);
    return <p onClick={() => a.store = "DD"}>{a.store}</p>
  };
  const el = mount(<C/>);
  expect(el.find("p").text()).toBe("D");
  el.find("p").simulate("click");
  expect(el.find("p").text()).toBe("DD");
});
