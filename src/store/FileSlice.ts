import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Preload from "../constants/Preload";
type FileData = ReturnType<typeof Preload.Parsing.parsingEpub>;

interface FileType {
  file: string | null;
  data: FileData | null;
}
const initialState: FileType = {
  file: null,
  data: null,
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
    },
    setData(state, action: PayloadAction<FileData>) {
      state.data = action.payload;
    },
  },
});

export default FileSlice;
