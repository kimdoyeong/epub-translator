import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FileType {
  file: string | null;
}
const initialState: FileType = {
  file: null,
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
    },
  },
});

export default FileSlice;
