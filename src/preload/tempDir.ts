import path from "path";
import fs from "fs";
import { remote } from "electron";

const tempDir = path.join(remote.app.getPath("temp"), "epub_translator");

!fs.existsSync(tempDir) && fs.mkdirSync(tempDir);

console.log(tempDir);
export default tempDir;
