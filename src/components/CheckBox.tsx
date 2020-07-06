import React from "react";

interface CheckBoxProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  label: string;
  disabled?: boolean;
}
function CheckBox({ label, value, onChange, disabled }: CheckBoxProps) {
  return (
    <label>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => {
          onChange && onChange(e.target.checked);
        }}
        disabled={disabled}
      />
      <span>{label}</span>
    </label>
  );
}

export default CheckBox;
