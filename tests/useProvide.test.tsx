import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { useProvide, provide } from "../src";

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

test("Should update component with array in useProvide", () => {
  class A {
    store = "D";
  }
  class B {
    store = "E";
  }
  const C = () => {
    const [a, b] = useProvide([A, B]);
    return <p>{a.store}{b.store}</p>
  };

  const el = mount(<C/>);
  expect(el.find("p").text()).toBe("DE");
  act(() => {
    provide(A).store = "DD";
  });
  expect(el.find("p").text()).toBe("DDE");
  act(() => {
    provide(B).store = "EE";
  });
  expect(el.find("p").text()).toBe("DDEE");
  act(() => {
    provide(A).store = "A";
    provide(B).store = "B";
  });
  expect(el.find("p").text()).toBe("AB");
});
