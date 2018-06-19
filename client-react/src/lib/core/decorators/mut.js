
export const mut = (...args) => {
  console.log(...args);
  return {
    value: 11,
    configurable: false,
    enumerable: true,
    writable: true
  }
};
