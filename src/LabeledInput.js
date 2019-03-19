import React from 'react'

const getDefaultInput = (state, props) => (
  <input
    className="labeled-input_input"
    value={state.value}
    onChange={e => state.onChange(e.target.value)}
    {...props}
  />
);

export default function LabeledInput({
  value,
  onChange,
  label,
  input = getDefaultInput,
  ...props
}) {
  return (
    <div>
      {label && <h3 className="labeled-input_label">{label}</h3>}
      <div className="labeled-input_input-wrapper">
        {input({ value, onChange }, props)}
      </div>
    </div>
  );
}