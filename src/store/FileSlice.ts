import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Preload from "../constants/Preload";
type FileData = ReturnType<typeof Preload.Parsing.parsingEpub>;

interface FileType {
  file: string | null;
  data: FileData | null;
  translate: keyof typeof Preload.translate;
  to: string | null;
  progress: boolean;
  progressState: string;
  done: boolean;
}
const initialState: FileType = {
  file: null,
  data: null,
  translate: Object.keys(Preload.translate)[0] as any,
  to: null,
  progress: false,
  progressState: "",
  done: false,
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
      state.file = null;
      state.data = null;
      state.translate = null;
      state.done = false;
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
  },
});

export default FileSlice;
