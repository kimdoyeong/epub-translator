import tmp from "tmp";
import { remote } from "electron";

const temp = tmp.dirSync();
const tempDir = temp.name;

remote.app.on("before-quit", () => {
  temp.removeCallback();
});

export default tempDir;
