
const m = {};
const t = new WeakMap();

function a() {
  t.set(m, () => {
    console.log("hello");
  })
}
a();
global.gc();
console.log(t.get(m)());
