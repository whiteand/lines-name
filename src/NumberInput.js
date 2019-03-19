import React from 'react'
import { log } from './utils'
import LabeledInput from './LabeledInput'

export default function NumberInput({
  value,
  onChange = log("Number.setValue"),
  label,
  minValue = 1,
  maxValue = 10000
}) {
  const handleChange = e => {
    onChange(+e.target.value);
  };
  return (
    <LabeledInput
      value={value}
      onChange={handleChange}
      label={label}
      input={() => (
        <input
          className="number-input_input"
          type="number"
          onChange={handleChange}
          value={value}
          min={minValue}
          max={maxValue}
        />
      )}
    />
  );
}