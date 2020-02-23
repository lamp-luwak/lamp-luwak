/**
 * @jest-environment jsdom
*/
import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { useProvide, useSubscribe, store, resolve } from "~/.";

test("Should update component with useProvide", () => {
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

test("Should pass useEffect with no subscribes object in useProvide", () => {
  class A { d = "D" }
  const C = () => {
    const a = useProvide(A);
    return <p>{a.d}</p>
  };
  const el = mount(<C/>);
  expect(el.find("p").text()).toBe("D");
});

test("Should update component with useSubscribe", () => {
  class A {
    @store d = "D";
  }
  const C = () => {
    const a = useSubscribe(() => new A);
    return <p onClick={() => a.d = "DD"}>{a.d}</p>
  };
  const el = mount(<C/>);
  expect(el.find("p").text()).toBe("D");
  el.find("p").simulate("click");
  expect(el.find("p").text()).toBe("DD");
});

test("Should pass useEffect with no subscribes object in useSubscribe", () => {
  class A { d = "D" }
  const C = () => {
    const a = useSubscribe(() => new A);
    return <p>{a.d}</p>
  };
  const el = mount(<C/>);
  expect(el.find("p").text()).toBe("D");
});
