import React, { useState } from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { Subscribe, create } from "../src";

test("Should update Subscribe children", () => {
  class A {
    store = "D";
  }
  const a = create(A);
  const el = mount(<Subscribe to={a}>{({to}) => <p>{to.store}</p>}</Subscribe>);
  expect(el.find("p").text()).toBe("D");
  act(() => {
    a.store = "DD";
  });
  expect(el.find("p").text()).toBe("DD");
});

test("Should work change prop in subscribe decorator for class component", () => {
  class E {
    store = "D"
  }
  const ee = [create(E), create(E)];
  const c = create(E);
  const C0 = () => {
    const [i,update] = useState(0);
    return (
      <b onClick={() => update(i+1)}>
        <Subscribe e={ee[i]} c={c}>
          {({e, c}) => (<i>{e.store + c.store}</i>)}
        </Subscribe>
      </b>
    )
  }

  c.store = "0";
  const c1 = mount(<C0/>);
  expect(c1.find("i").text()).toBe("D0");
  act(() => {
    ee[0].store = "DD";
  });
  expect(c1.find("i").text()).toBe("DD0");

  c1.find("b").simulate("click");
  expect(c1.find("i").text()).toBe("D0");
  act(() => {
    ee[1].store = "DDD";
  });
  expect(c1.find("i").text()).toBe("DDD0");

  act(() => {
    c.store = "1";
  });
  expect(c1.find("i").text()).toBe("DDD1");
});
