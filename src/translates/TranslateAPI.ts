import fs from "fs";
import path from "path";
import util from "util";
import cheerio from "cheerio";
import AdmZip from "adm-zip";
import tempDir from "../preload/tempDir";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
let words = 0;

type SupportLanguageType = {
  [from: string]: string[];
};

abstract class TranslateAPI {
  name: string;
  supportLanguages: SupportLanguageType;
  config: { id: string; name: string }[];

  constructor(
    name: string,
    supportLanguages: SupportLanguageType,
    config: { id: string; name: string }[]
  ) {
    this.name = name;
    this.supportLanguages = supportLanguages;
    this.config = config;
  }
  getLanguages(filter: string) {
    const data: { from: string; to: string }[] = [];

    if (filter) {
      return this.supportLanguages[filter].map((to) => ({ from: filter, to }));
    }

    for (const [from, toList] of Object.entries(this.supportLanguages)) {
      for (const to of toList) {
        data.push({
          from,
          to,
        });
      }
    }

    return data;
  }
  isSupport(from: string, to: string) {
    const fromLang = this.supportLanguages[from];
    if (!fromLang) return false;

    for (const support of fromLang) {
      if (support === to) return true;
    }
    return false;
  }
  translateBook(from: string, to: string, filepath: string, spines: string[]) {
    const basename = path.basename(filepath);
    const filePath = path.join(tempDir, basename);
    const folderPath = path.join(tempDir, basename.replace(/\.epub$/, ""));

    fs.copyFileSync(filepath, filePath);
    const zip = new AdmZip(filepath);
    zip.extractAllTo(folderPath, true);

    const jobs = spines.map((name) => {
      const execute = async () => {
        const filePath = path.join(folderPath, name);

        await this.translateNodes(from, to, filePath);
      };

      return {
        name: name + " 번역",
        execute,
      };
    });

    return [
      {
        name: "제목 번역",
        execute: async () => {
          this.translateTitle(from, to, folderPath);
        },
      },
      ...jobs,
      {
        name: "패킹",
        execute: async () => {
          const translatePath =
            filepath.replace(/\.epub$/, "") + "-" + to + ".epub";

          const zip = new AdmZip();
          zip.addLocalFolder(folderPath);
          zip.writeZip(translatePath);

          console.log(words);
        },
      },
    ];
  }

  private async translateNodes(
    from: string,
    to: string,
    filePath: string | Buffer
  ) {
    const data = await readFile(filePath);
    const $ = cheerio.load(data, { decodeEntities: false, xmlMode: true });

    const translate = this.translate.bind(this);

    const elements = $("body p, body a")
      .map(async function () {
        if (!$(this).text().trim()) return;

        $("ruby rt", this).remove();
        const text = $(this).text();
        words += text.length;
        const node = await translate(from, to, text);
        $(this).text(node);
      })
      .toArray()
      .filter(Boolean);

    await Promise.all(elements);
    await writeFile(filePath, $.xml());
  }
  private async translateTitle(from: string, to: string, folderPath: string) {
    const containerPath = path.join(folderPath, "META-INF/container.xml");

    if (!fs.existsSync(containerPath))
      throw new Error("container.xml 파일이 없습니다!");

    const metaFile = await readFile(containerPath);
    const $meta = cheerio.load(metaFile, { xmlMode: true });

    const _opf = $meta("container > rootfiles > rootfile").attr("full-path");
    const opf = path.join(folderPath, _opf);

    if (!opf) throw new Error(".opf 파일 위치를 찾을 수 없습니다.");

    if (!fs.existsSync(opf)) throw new Error(".opf 파일이 존재하지 않습니다.");
    const opfData = await readFile(opf);
    const $opf = cheerio.load(opfData, {
      decodeEntities: false,
      xmlMode: true,
    });

    const title = $opf("dc\\:title").text();
    $opf("dc\\:title").text(await this.translate(from, to, title));
    $opf("dc\\:language").text(to);

    await writeFile(opf, $opf.xml().toString());
  }
  abstract translate(from: string, to: string, text: string): Promise<string>;
}

export const languageCode = {
  ko: "한국어",
  ja: "일본어",
  en: "영어",
  zh: "중국어",
  "zh-CN": "중국어 (간체)",
  "zh-TW": "중국어 (번체)",
  vi: "베트남어",
  id: "인도네시아어",
  th: "태국어",
  de: "독일어",
  ru: "러시아어",
  es: "스페인어",
  it: "이탈리아어",
  fr: "프랑스어",
};

export default TranslateAPI;
