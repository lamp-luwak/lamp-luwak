import React from "react";
import { shallow } from "enzyme";
import { Subscribe, store } from "~/.";

test("Should update Subscribe children", () => {
  class A {
    @store d = "D";
  }
  const a = new A;
  const el = shallow(<Subscribe to={a}>{() => <p>{a.d}</p>}</Subscribe>);
  expect(el.find("p").text()).toBe("D");
  a.d = "DD";
  expect(el.find("p").text()).toBe("DD");
});
