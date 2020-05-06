import React, { useState } from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { Subscribe, store, set } from "../src";

test("Should update Subscribe children", () => {
  class A {
    state = "D";
  }
  const a = store(A);
  const el = mount(<Subscribe to={a}>{({to}) => <p>{to.state}</p>}</Subscribe>);
  expect(el.find("p").text()).toBe("D");
  act(() => {
    set(a, "DD");
  });
  expect(el.find("p").text()).toBe("DD");
});

test("Should work change prop in subscribe decorator for class component", () => {
  class E {
    state = "D"
  }
  const ee = [store(E), store(E)];
  const c = store(E);
  const C0 = () => {
    const [i,update] = useState(0);
    return (
      <b onClick={() => update(i+1)}>
        <Subscribe e={ee[i]} c={c}>
          {({e, c}) => (<i>{e.state + c.state}</i>)}
        </Subscribe>
      </b>
    )
  }

  set(c, "0");
  const c1 = mount(<C0/>);
  expect(c1.find("i").text()).toBe("D0");
  act(() => {
    set(ee[0], "DD");
  });
  expect(c1.find("i").text()).toBe("DD0");

  c1.find("b").simulate("click");
  expect(c1.find("i").text()).toBe("D0");
  act(() => {
    set(ee[1], "DDD");
  });
  expect(c1.find("i").text()).toBe("DDD0");

  act(() => {
    set(c, "1");
  });
  expect(c1.find("i").text()).toBe("DDD1");
});
