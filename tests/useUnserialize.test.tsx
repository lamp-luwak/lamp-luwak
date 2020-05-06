import React from "react";
import { mount } from "enzyme";
import { useService, useUnserialize, register } from "../src";

test("Should work unserialize with useUnserialize", () => {
  class A {
    state = "D";
  }
  register(A, "A");
  const C = ({ data }: any) => {
    useUnserialize(data);
    const a = useService(A);
    return <p>{a.state}</p>
  };
  const data = [[["A", 1]], "DD"];
  const el = mount(<C data={data}/>);
  expect(el.find("p").text()).toBe("DD");
});
