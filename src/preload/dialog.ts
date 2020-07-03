import { remote } from "electron";

export function openEpubDialog() {
  return remote.dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "Epub", extensions: ["epub"] }],
  });
}
