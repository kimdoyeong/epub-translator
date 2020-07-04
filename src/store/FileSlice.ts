import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Preload from "../constants/Preload";
type FileData = ReturnType<typeof Preload.Parsing.parsingEpub>;

interface FileType {
  file: string | null;
  data: FileData | null;
  translate: keyof typeof Preload.translate;
  to: string | null;
}
const initialState: FileType = {
  file: null,
  data: null,
  translate: Object.keys(Preload.translate)[0] as any,
  to: null,
};
const FileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFile(state, action: PayloadAction<string>) {
      state.file = action.payload;
    },
    clearFile(state) {
      state.file = null;
      state.data = null;
      state.translate = null;
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
  },
});

export default FileSlice;
