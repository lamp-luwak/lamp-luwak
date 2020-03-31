import React from "react";
import { mount } from "enzyme";
import { useProvide, useUnserialize, register } from "../src";

test("Should work unserialize with useUnserialize", () => {
  class A {
    store = "D";
  }
  register(A, "A");
  const C = ({ data }: any) => {
    useUnserialize(data);
    const a = useProvide(A);
    return <p>{a.store}</p>
  };
  const data = [[["A", 1]], "DD"];
  const el = mount(<C data={data}/>);
  expect(el.find("p").text()).toBe("DD");
});
