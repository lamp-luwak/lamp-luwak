export function uniqid() {
  return process.hrtime.bigint().toString(32);
}
