import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { useService, useServices, service, set } from "../src";

test("Should update component with useService", () => {
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

test("Should update component with array in useService", () => {
  class A {
    state = "D";
  }
  class B {
    state = "E";
  }
  const C = () => {
    const [a, b] = useServices(A, B);
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

test("Should unsubscribe after component unmounted", () => {
  class A { state = "A"; }
  const C = () => <p>{useService(A).state}</p>;
  const el = mount(<C/>);
  expect(el.find("p").text()).toBe("A");
  el.unmount();
})
