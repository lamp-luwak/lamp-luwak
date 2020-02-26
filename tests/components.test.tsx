import React, { useState } from "react";
import { shallow, mount } from "enzyme";
import { Subscribe, store } from "~/.";

test("Should update Subscribe children", () => {
  class A {
    @store d = "D";
  }
  const a = new A;
  const el = shallow(<Subscribe to={a}>{({to}) => <p>{to.d}</p>}</Subscribe>);
  expect(el.find("p").text()).toBe("D");
  a.d = "DD";
  expect(el.find("p").text()).toBe("DD");
});

test("Should work change prop in subscribe decorator for class component", () => {
  class E {
    @store d = "D"
  }
  const ee = [new E, new E];
  const c = new E;
  const C0 = () => {
    const [i,update] = useState(0);
    return (
      <b onClick={() => update(i+1)}>
        <Subscribe e={ee[i]} c={c}>
          {({e, c}) => (<i>{e.d + c.d}</i>)}
        </Subscribe>
      </b>
    )
  }

  c.d = "0";
  const c1 = mount(<C0/>);
  expect(c1.find("i").text()).toBe("D0");
  ee[0].d = "DD";
  expect(c1.find("i").text()).toBe("DD0");

  c1.find("b").simulate("click");
  expect(c1.find("i").text()).toBe("D0");
  ee[1].d = "DDD";
  expect(c1.find("i").text()).toBe("DDD0");

  c.d = "1";
  expect(c1.find("i").text()).toBe("DDD1");
});
