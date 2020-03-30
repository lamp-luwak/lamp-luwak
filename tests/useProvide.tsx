/**
 * @jest-environment jsdom
*/
import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { useProvide, provide, subscribe } from "../src";

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
  });
  expect(el.find("p").text()).toBe("DD");
});
