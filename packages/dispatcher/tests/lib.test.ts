import {
  event,
  listen,
  dispatch
} from "~/lib";

test("It works", () => {

  const BEvent = event("BEvent");

  class A {
    @listen(BEvent)
    onBEvent(data: any) {
      console.log(data);
    }
  }

  class B {
    fire() {
      dispatch(BEvent, "BEvent_DATA");
    }
  }

  const [ a1, a2, b ] = [ new A, new A, new B ];
  b.fire();

  // expect(dispatch).not.toBeUndefined();
});
