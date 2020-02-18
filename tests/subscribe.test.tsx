/**
 * @jest-environment jsdom
*/
import React from "react";
import { shallow, mount } from "enzyme";
import { act } from "react-dom/test-utils";
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

test("Should work as property decorator", () => {
  class A {
    @store a = "A"
  }
  class B {
    @store b = "B"
  }
  let _a: any;
  let _b: any;
  class Cmp extends React.PureComponent {
    @subscribe a = new A;
    b: B;

    constructor(props: any) {
      super(props);
      subscribe(this, this.b = new B);
      _a = this.a;
      _b = this.b;
    }
    render() {
      return (
        <>
          <a>{this.a.a}</a>
          <b>{this.b.b}</b>
        </>
      );
    }
  }
  const cmp = shallow(<Cmp />);
  expect(cmp.find("a").text()).toBe("A");
  expect(cmp.find("b").text()).toBe("B");
  _a.a = "AA";
  expect(cmp.find("a").text()).toBe("AA");
  _b.b = "BB";
  expect(cmp.find("b").text()).toBe("BB");
});

test("Should throw redefine exception as property decorator", () => {
  class A {}
  class Cmp extends React.PureComponent {
    @subscribe a = new A;

    constructor(props: any) {
      super(props);
      this.a = new A;
    }
    render() {
      return <a/>;
    }
  }
  expect(() => {
    shallow(<Cmp />);
  }).toThrowError("Cannot redefine subscribed property");
});

test("Should work inititializer in subscribe decorator", () => {
  class A {
    @store a = "A";
  }
  let _a: any;
  class Cmp extends React.PureComponent {
    constructor(props: any) {
      super(props);
      const descriptor = subscribe({}, "a", { initializer: () => _a = new A });
      Object.defineProperty(this, "a", descriptor);
    }
    render() {
      return <a>{(this as any).a.a}</a>;
    }
  }
  const cmp = shallow(<Cmp />);
  expect(cmp.find("a").text()).toBe("A");
  _a.a = "AA";
  expect(cmp.find("a").text()).toBe("AA");
});

test("Should work without errors", () => {
  expect(() => {
    subscribe({} as any);
  }).not.toThrow();
});
