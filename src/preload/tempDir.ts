import path from "path";
import fs from "fs";
import { remote } from "electron";
import rimraf from "rimraf";

const tempDir = path.join(remote.app.getPath("temp"), "epub_translator");

if (fs.existsSync(tempDir)) {
  rimraf.sync(tempDir);
}
fs.mkdirSync(tempDir);

console.log(tempDir);
export default tempDir;
