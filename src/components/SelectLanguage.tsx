import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import Preload from "../constants/Preload";
import { languageCode } from "../translates/TranslateAPI";
import FileSlice from "../store/FileSlice";

function SelectLanguage({ target }: { target: string }) {
  const { translate, to } = useSelector((state: RootState) => state.file);
  const dispatch = useDispatch();

  const { driver } = Preload.translate[translate];
  const name: string = (languageCode as any)[target];
  const translateLanguages = driver.getLanguages(target);

  console.log(to);
  useEffect(() => {
    if (translateLanguages.length > 0) {
      dispatch(FileSlice.actions.setToLanguage(translateLanguages[0].to));
    }
  }, [translateLanguages, dispatch]);
  if (!name) return <div>지원하지 않는 언어입니다.</div>;

  return (
    <div style={{ marginBottom: "1em" }}>
      <span>{name} → </span>
      <select
        value={to || translateLanguages[0].to}
        onChange={(e) =>
          dispatch(FileSlice.actions.setToLanguage(e.target.value))
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
