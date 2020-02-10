/**
 * @jest-environment jsdom
*/
import React from "react";
import { shallow, mount } from "enzyme";
import { subscribe, provide, store, resolve } from "~/.";
import { Unsubscribers } from "~/subscribe/consts";

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

test("Should work component will unmount", () => {
  const spy1 = jest.fn();
  const spy2 = jest.fn();
  const spy3 = jest.fn();

  class C extends React.PureComponent {
    constructor(props: any) {
      super(props);
      subscribe(this);
      (this as any)[Unsubscribers].push(spy1);
    }
    componentWillUnmount() {
      spy2();
    }
    render() {
      spy3();
      return <p />
    }
  }
  const w = mount(<C />);
  expect(spy1).toBeCalledTimes(0);
  expect(spy2).toBeCalledTimes(0);
  expect(spy3).toBeCalledTimes(1);
  w.unmount();
  expect(spy1).toBeCalledTimes(1);
  expect(spy2).toBeCalledTimes(1);
  expect(spy3).toBeCalledTimes(1);
});

test("Should non reset unsubscribers after next call", () => {
  const spy1 = jest.fn();

  class A {
    @store d: any;
  }
  class C extends React.PureComponent {
    constructor(props: any) {
      super(props);

      expect((this as any).componentWillUnmount).toBeUndefined();
      subscribe(this, resolve(A));
      expect((this as any)[Unsubscribers].length).toBe(1);
      subscribe(this);
      expect((this as any)[Unsubscribers].length).toBe(1);
      expect((this as any).componentWillUnmount).not.toBeUndefined();
      spy1();
    }
    render() {
      return <p />;
    }
  }
  const w = mount(<C />);
  expect(spy1).toBeCalled();
  w.unmount();
});

test("Should pass non store containers props in subscribed components", () => {
  const spy = jest.fn();
  @subscribe
  class Cmp extends React.PureComponent<{ a: string }> {
    componentDidMount() {
      expect((this as any)[Unsubscribers]).toBeUndefined();
      spy();
    }
    render() {
      return <p>{this.props.a}</p>;
    }
  }
  const cmp = shallow(<Cmp a="M" />);
  expect(cmp.find("p").text()).toBe("M");
  expect(spy).toBeCalled();
});
