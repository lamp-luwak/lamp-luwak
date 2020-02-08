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
  el.mount();
  expect(el.find("p").text()).toBe("D");
  act(() => {
    resolve(A).d = "DD";
  })
  expect(el.find("p").text()).toBe("DD");
});
