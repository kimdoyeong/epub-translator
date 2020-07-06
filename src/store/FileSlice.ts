import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Preload from "../constants/Preload";
import { TranslateManagerOptions } from "../preload/TranslateManager";
type FileData = ReturnType<typeof Preload.Parsing.parsingEpub>;

interface FileType {
  file: string | null;
  data: FileData | null;
  translate: keyof typeof Preload.translate;
  to: string | null;
  progress: boolean;
  progressState: string;
  done: boolean;
  options: Partial<TranslateManagerOptions>;
}
const initialState: FileType = {
  file: null,
  data: null,
  translate: Object.keys(Preload.translate)[0] as any,
  to: null,
  progress: false,
  progressState: "",
  done: false,
  options: {},
};
const FileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setProgress(state, action: PayloadAction<boolean>) {
      state.progress = action.payload;
    },
    setFile(state, action: PayloadAction<string>) {
      state.file = action.payload;
    },
    clearFile(state) {
      for (const key of Object.keys(initialState)) {
        const k: keyof FileType = key as any;
        (state as any)[k] = initialState[k];
      }
    },
    setData(state, action: PayloadAction<FileData>) {
      state.data = action.payload;
    },
    setTranslate(state, action: PayloadAction<keyof typeof Preload.translate>) {
      state.translate = action.payload;
    },
    setToLanguage(state, action: PayloadAction<string>) {
      state.to = action.payload;
    },
    setProgressState(state, action: PayloadAction<string>) {
      state.progressState = action.payload;
      state.done = false;
    },
    done(state) {
      state.progressState = "";
      state.done = true;
      state.progress = false;
    },
    setDone(state, action: PayloadAction<boolean>) {
      state.done = action.payload;
    },
    setOption(state, action: PayloadAction<Partial<TranslateManagerOptions>>) {
      state.options = { ...state.options, ...action.payload };
    },
  },
});

export default FileSlice;
