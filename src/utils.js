import { useState } from 'react'
export const log = caption => (...args) => {
  console.groupCollapsed(caption);
  console.log({ args });
  console.groupEnd(caption);
};

export const useMergeState = initialValue => {
  const [value, setValue] = useState(initialValue)
  return [
    value,
    (newValue) => {
      setValue(value => value ? { ...value, ...newValue } : newValue)
    }
  ]
}