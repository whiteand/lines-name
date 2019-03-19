export const log = caption => (...args) => {
  console.groupCollapsed(caption);
  console.log({ args });
  console.groupEnd(caption);
};