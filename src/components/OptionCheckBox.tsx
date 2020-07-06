import React, { useCallback } from "react";
import { TranslateManagerOptions } from "../preload/TranslateManager";
import { useDispatch, useSelector } from "react-redux";
import CheckBox from "./CheckBox";
import { RootState } from "../store";
import FileSlice from "../store/FileSlice";

interface OptionCheckBoxProps {
  label: string;
  target: keyof TranslateManagerOptions;
}
function OptionCheckBox({ label, target }: OptionCheckBoxProps) {
  const dispatch = useDispatch();
  const { options, progress } = useSelector((state: RootState) => state.file);

  const change = useCallback(
    (v: boolean) => {
      dispatch(
        FileSlice.actions.setOption({
          [target]: v,
        })
      );
    },
    [dispatch, target]
  );
  return (
    <div>
      <CheckBox
        label={label}
        value={options[target]}
        onChange={change}
        disabled={progress}
      />
    </div>
  );
}

export default OptionCheckBox;
