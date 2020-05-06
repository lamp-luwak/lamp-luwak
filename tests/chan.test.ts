import { chan, receive, send, multi } from "../src";

test("Should work chan with two chans with callback", () => {
  const fn1 = jest.fn();
  const fn2 = jest.fn();
  const fn3 = jest.fn();
  const a = {};
  const b = {};
  chan(b, a, (s) => {
    fn1(s);
    return s + 5;
  });
  receive(a, fn2);
  receive(b, fn3);
  send(b, 1);
  expect(fn1).toBeCalledWith(1);
  expect(fn2).toBeCalledWith(6);
  expect(fn3).toBeCalledWith(1);
});

test("Should work chan with two chans without callback", () => {
  const fn = jest.fn();
  const [ a, b ] = [ {}, {} ];
  chan(b, a);
  receive(a, fn);
  send(b, 10);
  expect(fn).toBeCalledWith(10);
});

test("Should work chan with one to many", () => {
  const [ f1, f2 ] = [ jest.fn(), jest.fn() ];
  const [ a, b, c ] = [ {}, {}, {} ];
  chan(a, multi(b, c), (s) => s + 1);
  receive(b, f1);
  receive(c, f2);
  send(a, 10);
  expect(f1).toBeCalledTimes(1);
  expect(f1).toBeCalledWith(11);
  expect(f2).toBeCalledTimes(1);
  expect(f2).toHaveBeenNthCalledWith(1, 11);
});

test("Should resolve diamond problem in chan mechanism and non changed signal", () => {
  const fn = jest.fn();
  const [ a, b, c, d ] = [ {}, {}, {}, {} ];
  chan(a, multi(b, c));
  chan(multi(b, c), d);
  receive(d, fn);
  send(a, 10);
  expect(fn).toBeCalledTimes(1);
  expect(fn).toBeCalledWith(10);
});

test("Should resolve diamond problem in chan mechanism and changed signal", () => {
  const fn = jest.fn();
  const [ a, b, c, d ] = [ {}, {}, {}, {} ];
  chan(a, b, (s) => s + 1);
  chan(a, c, (s) => s + 2);
  chan(multi(b, c), d);
  receive(d, fn);
  send(a, 10);
  expect(fn).toBeCalledTimes(2);
  expect(fn).toHaveBeenNthCalledWith(1, 11);
  expect(fn).toHaveBeenNthCalledWith(2, 12);
});
