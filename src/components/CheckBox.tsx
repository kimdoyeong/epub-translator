import React from "react";

interface CheckBoxProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  label: string;
}
function CheckBox({ label, value, onChange }: CheckBoxProps) {
  return (
    <label>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => {
          onChange && onChange(e.target.checked);
        }}
      />
      <span>{label}</span>
    </label>
  );
}

export default CheckBox;
