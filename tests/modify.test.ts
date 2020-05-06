import { modify, store, watch } from "../src";

test("Should modify store", () => {
  const inst = {
    state: {
      a: 0,
      b: 1,
      c: {
        a: 10,
        b: {
          a: 12
        }
      }
    }
  }
  const prevState = inst.state;
  modify(inst).c.b.a = 13;
  expect(inst.state).toStrictEqual({
    a: 0,
    b: 1,
    c: {
      a: 10,
      b: {
        a: 13
      }
    }
  });
  expect(inst.state).not.toBe(prevState);
  expect(inst.state.c).not.toBe(prevState.c);
  expect(inst.state.c.b).not.toBe(prevState.c.b);
});

test("Should modify store with only one assignment", () => {
  const spy = jest.fn();
  class Class {
    state = {
      a: 0,
      b: 1,
      c: {
        a: 10
      }
    };
  }
  const inst = store(Class);
  watch(inst, spy);
  const prevState = inst.state;
  modify(inst, (context) => {
    context.a = 11;
    context.c.a = 22;
  });
  expect(inst.state).toStrictEqual({
    a: 11,
    b: 1,
    c: {
      a: 22
    }
  });
  expect(inst.state).not.toBe(prevState);
  expect(spy).toBeCalledWith(
    {
      a: 11,
      b: 1,
      c: {
        a: 22
      }
    },
    {
      a: 0,
      b: 1,
      c: {
        a: 10
      }
    }
  );
  expect(spy).toBeCalledTimes(1);
});

test("Should no dispatch with no modify", () => {
  const spy = jest.fn();
  class Class {
    state = {};
  }
  const inst = store(Class);
  watch(inst, spy);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  modify(inst, () => {});
  expect(spy).toBeCalledTimes(0);
});

test("Should throw invalid schema exception", () => {
  expect(() => {
    class Class {
      state = {
        a: 0
      };
    }
    const inst = store(Class);
    (modify(inst).a as any).k = 10;
  }).toThrowError("Only current value schema supported");
});
