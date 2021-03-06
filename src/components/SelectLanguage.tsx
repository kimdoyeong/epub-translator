import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import Preload from "../constants/Preload";
import { languageCode } from "../translates/TranslateAPI";
import FileSlice from "../store/FileSlice";

function SelectLanguage() {
  const {
    translate,
    to,
    progress,
    data: { language },
  } = useSelector((state: RootState) => state.file);
  const target = language;
  const dispatch = useDispatch();

  const { driver } = Preload.translate[translate];
  const name: string = (languageCode as any)[target];
  const translateLanguages = driver.getLanguages(target);

  useEffect(() => {
    if (translateLanguages.length > 0 && !to) {
      dispatch(FileSlice.actions.setToLanguage(translateLanguages[0].to));
    }
  }, [translateLanguages, to, dispatch]);
  if (!name) return <div>지원하지 않는 언어입니다.</div>;

  return (
    <div style={{ marginBottom: "1em" }}>
      <span>{name} → </span>
      <select
        value={to || translateLanguages[0].to}
        disabled={progress}
        onChange={(e) =>
          !progress && dispatch(FileSlice.actions.setToLanguage(e.target.value))
        }
      >
        {translateLanguages.map(({ to }) => (
          <option value={to} key={to}>
            {(languageCode as any)[to]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectLanguage;
