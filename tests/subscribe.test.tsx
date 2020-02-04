import React from "react";
import { shallow } from "enzyme";
import { subscribe, provide, store } from "~/.";

test("Should subscribe on provided services", () => {
  class A {
    @store d = "D";
  }
  class Cmp extends React.PureComponent {
    @provide a: A;
    handleClick = () => {
      this.a.d = "DD";
    }
    render() {
      const { d } = this.a;
      return (
        <p onClick={this.handleClick}>{d}</p>
      )
    }
  }
  const cmp = shallow(<Cmp />);
  expect(cmp.find("p").text()).toBe("D");
  cmp.find("p").simulate("click");
  expect(cmp.find("p").text()).toBe("DD");
});

test("Should work subscribe decorator with props", () => {
  class A {
    @store d = "D";
  }
  @subscribe
  class Cmp extends React.PureComponent<{ a: A }> {
    render() {
      const { d } = this.props.a;
      return (
        <p>{d}</p>
      )
    }
  }
  const a = new A;
  const cmp = shallow(<Cmp a={a} />);
  expect(cmp.find("p").text()).toBe("D");
  a.d = "DD";
  expect(cmp.find("p").text()).toBe("DD");
});
