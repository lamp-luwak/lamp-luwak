import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { useService, service, set } from "../src";

test("Should update component with useProvide", () => {
  class A {
    state = "D";
  }
  const C = () => {
    const a = useService(A);
    return <p>{a.state}</p>
  };

  const el = mount(<C/>);
  expect(el.find("p").text()).toBe("D");
  act(() => {
    set(service(A), "DD");
  });
  expect(el.find("p").text()).toBe("DD");
});

test("Should update component with array in useProvide", () => {
  class A {
    state = "D";
  }
  class B {
    state = "E";
  }
  const C = () => {
    const [a, b] = useService([A, B]);
    return <p>{a.state}{b.state}</p>
  };

  const el = mount(<C/>);
  expect(el.find("p").text()).toBe("DE");
  act(() => {
    set(service(A), "DD");
  });
  expect(el.find("p").text()).toBe("DDE");
  act(() => {
    set(service(B), "EE");
  });
  expect(el.find("p").text()).toBe("DDEE");
  act(() => {
    set(service(A), "A");
    set(service(B), "B");
  });
  expect(el.find("p").text()).toBe("AB");
});
