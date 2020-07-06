import path from "path";
import fs from "fs";
import { promises as fsPromise } from "fs";
import AdmZip from "adm-zip";
import cheerio from "cheerio";
import { parsingEpub } from "./parsing";
import tempDir from "./tempDir";
import TranslateAPI from "../translates/TranslateAPI";
import translate from "./translate";

class TranslateManager {
  private targetLanguage: string;
  private filePath: string;
  private translator: TranslateAPI;
  private bookData: ReturnType<typeof parsingEpub>;
  private options: Partial<TranslateManagerOptions> = {};

  constructor(
    targetLanguage: string,
    filePath: string,
    driver: keyof typeof translate
  ) {
    this.targetLanguage = targetLanguage;
    this.filePath = filePath;
    this.bookData = parsingEpub(this.filePath);
    this.translator = translate[driver].driver;
  }
  setOptions(options: Partial<TranslateManagerOptions>) {
    this.options = {
      ...this.options,
      ...options,
    };

    return this;
  }
  getJobs() {
    const tempPath = this.getTempPath();

    const zip = new AdmZip(this.filePath);
    zip.extractAllTo(tempPath.folder, true);

    return [
      {
        name: "제목 번역",
        execute: this.translateMetadata.bind(this),
      },
      ...this.bookData.spines.map((path) => ({
        name: path + " 번역",
        execute: () => this.translateSpine(path),
      })),
      {
        name: "마무리 작업",
        execute: this.packing.bind(this),
      },
    ];
  }
  private async translateMetadata() {
    const tempPath = this.getTempPath();
    const opfPath = path.join(tempPath.folder, this.bookData.opf);

    if (!fs.existsSync(opfPath))
      throw new Error(".opf 파일을 찾을 수 없습니다.");
    const $ = cheerio.load(await fsPromise.readFile(opfPath), {
      decodeEntities: false,
      xmlMode: true,
    });

    // get strings
    const title = $("dc\\:title").text();

    // set
    $("dc\\:title").text(await this.translate(title));
    $("dc\\:language").text(this.targetLanguage);

    for (const i of Object.values(this.bookData.manifests)) {
      const item: any = i;
      if (item["media-type"] === "text/css") {
        await this.handleCss(item.href);
      }
    }
    const { forceHorizontalWriting } = this.options;
    if (forceHorizontalWriting) {
      $("spine").removeAttr("page-progression-direction");
    }
    await fsPromise.writeFile(opfPath, $.xml().toString());
  }
  private async translate(text: string) {
    if (process.env.NO_TRANSLATION) return text;
    return await this.translator.translate(
      this.bookData.language,
      this.targetLanguage,
      text
    );
  }
  private async translateSpine(slug: string) {
    const tempPath = this.getTempPath();
    const filePath = path.join(tempPath.folder, slug);

    const { targetLanguage } = this;
    const translate = this.translate.bind(this);
    const $ = cheerio.load(await fsPromise.readFile(filePath), {
      decodeEntities: false,
      xmlMode: true,
    });
    const elements = $("p, a, h1, h2, h3, h4, h5, h6")
      .map(async function () {
        const text = $(this).text();
        if (!text.trim()) return;

        targetLanguage === "ja" && $("ruby rt", this).remove(); // 일본어의 경우 후리가나 제거
        const translatedText = await translate(text);
        $(this).text(translatedText);
      })
      .toArray()
      .filter(Boolean);

    await Promise.all(elements);
    await fsPromise.writeFile(filePath, $.xml().toString());
  }
  private async packing() {
    const tempPath = this.getTempPath();
    const translatedEpubPath =
      this.filePath.replace(/\.epub$/, "") +
      "-" +
      this.targetLanguage +
      ".epub";
    const zip = new AdmZip();

    zip.addLocalFolder(tempPath.folder);
    zip.writeZip(translatedEpubPath);
  }
  private async handleCss(slug: string) {
    const { forceHorizontalWriting } = this.options;
    if (!forceHorizontalWriting) return;

    const filePath = path.join(this.getTempPath().folder, slug);
    const data = await (await fsPromise.readFile(filePath))
      .toString()
      .split("\n");
    const newCss = data
      .filter((line) => {
        if (forceHorizontalWriting && line.match(/writing\-mode/)) return false;
        return true;
      })
      .join("\n");

    await fsPromise.writeFile(filePath, newCss);
  }
  private getTempPath() {
    const basename = path.basename(this.filePath);

    return {
      file: path.join(tempDir, basename),
      folder: path.join(tempDir, basename.replace(/\.epub$/, "")),
    };
  }
}

export interface TranslateManagerOptions {
  forceHorizontalWriting: boolean;
}

if (process.env.NO_TRANSLATION)
  console.log("⚠️ NO_TRANSLATION 옵션이 켜져 있습니다.");

export default TranslateManager;
