import React from "react";
import OptionCheckBox from "./OptionCheckBox";

function Options() {
  return (
    <fieldset style={{ marginTop: "1em" }}>
      <legend>옵션</legend>
      <OptionCheckBox label="가로쓰기 설정" target="forceHorizontalWriting" />
    </fieldset>
  );
}
export default Options;
