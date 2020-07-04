import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Preload from "../constants/Preload";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import FileSlice from "../store/FileSlice";

function SelectTranslateAPI() {
  const [configs, setConfigs] = useState<{ [key: string]: string }>({});
  const apis = Object.entries(Preload.translate).map(([id, value]) => ({
    ...value,
    id,
  }));
  const translate = useSelector((state: RootState) => state.file.translate);
  const dispatch = useDispatch();

  const config = Preload.translate[translate].driver.config;

  useEffect(() => {
    const data: { [key: string]: string } = {};

    for (const c of config) {
      data[c.id] = Preload.PreferenceManager.get(c.id) || "";
    }
    setConfigs(data);
  }, [config]);

  const onConfigChange = useCallback((key: string) => {
    return (e: any) => {
      const value = e.target.value;
      value &&
        setConfigs((configs: any) => ({
          ...configs,
          [key]: value,
        }));
    };
  }, []);
  const apply = useCallback(() => {
    for (const [key, value] of Object.entries(configs)) {
      Preload.PreferenceManager.set(key, value);
    }
  }, [configs]);

  return (
    <Wrap>
      <select
        value={translate}
        onChange={(e) =>
          dispatch(FileSlice.actions.setTranslate(e.target.value as any))
        }
      >
        {apis.map((d) => (
          <option value={d.id} key={d.id}>
            {d.name}
          </option>
        ))}
      </select>
      <div className="configs">
        {config.map((v) => (
          <label className="input" key={v.id}>
            <span>{v.name}</span>
            <input
              type="text"
              value={configs[v.id] || ""}
              onChange={onConfigChange(v.id)}
            />
          </label>
        ))}
        <button onClick={apply}>적용</button>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
  .configs {
    margin-top: 1em;
    .input {
      display: flex;
      margin-bottom: 0.5em;
      span {
        width: 100px;
      }
    }
  }
`;

export default SelectTranslateAPI;
