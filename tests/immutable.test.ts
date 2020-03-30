import { modify, create, subscribe } from "../src";

test("Should modify store", () => {
  const inst = {
    store: {
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
  const prevStore = inst.store;
  modify(inst).c.b.a = 13;
  expect(inst.store).toStrictEqual({
    a: 0,
    b: 1,
    c: {
      a: 10,
      b: {
        a: 13
      }
    }
  });
  expect(inst.store).not.toBe(prevStore);
  expect(inst.store.c).not.toBe(prevStore.c);
  expect(inst.store.c.b).not.toBe(prevStore.c.b);
});

test("Should modify store with only one assignment", () => {
  const spy = jest.fn();
  class Class {
    store = {
      a: 0,
      b: 1,
      c: {
        a: 10
      }
    };
  }
  const inst = create(Class);
  subscribe(inst, spy);
  const prevStore = inst.store;
  modify(inst, (context) => {
    context.a = 11;
    context.c.a = 22;
  });
  expect(inst.store).toStrictEqual({
    a: 11,
    b: 1,
    c: {
      a: 22
    }
  });
  expect(inst.store).not.toBe(prevStore);
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
    store = {};
  }
  const inst = create(Class);
  subscribe(inst, spy);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  modify(inst, () => {});
  expect(spy).toBeCalledTimes(0);
});

test("Should throw invalid schema exception", () => {
  expect(() => {
    class Class {
      store = {
        a: 0
      };
    }
    const inst = create(Class);
    (modify(inst).a as any).k = 10;
  }).toThrowError("Only current value schema supported");
});
