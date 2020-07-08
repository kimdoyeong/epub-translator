import AdmZip from "adm-zip";
import cheerio from "cheerio";
import translate from "./translate";
import TranslateManager from "./TranslateManager";

export function parsingEpub(bookPath: string) {
  console.log(bookPath);
  const zip = new AdmZip(bookPath);

  const container = zip.getEntry("META-INF/container.xml");
  if (!container) throw new Error("잘못된 epub 파일입니다.");

  const data = container.getData();
  const $container = cheerio.load(data, { xmlMode: true });

  const opf = $container("container > rootfiles > rootfile").attr("full-path");
  if (!opf) throw new Error(".opf 파일 위치를 찾을 수 없습니다.");

  const opfFile = zip.getEntry(opf);
  if (!opfFile) throw new Error(".opf 파일이 존재하지 않습니다.");
  const opfData = opfFile.getData();
  const $opf = cheerio.load(opfData, { xmlMode: true });

  const title = $opf("dc\\:title").text();
  const language = $opf("dc\\:language")
    .text()
    .replace(/\-(.+)$/, "");
  console.log(language);
  const manifests: any = {};

  $opf("manifest > item").each(function (index, node) {
    const el = $opf(this);
    manifests[el.attr("id")] = node.attribs;
  });

  const coverId = getCoverId($opf);
  const coverSrc = coverId ? manifests[coverId] : undefined;
  const coverEntry = coverSrc && zip.getEntry(coverSrc.href);
  const cover = coverEntry
    ? "data:" +
      coverSrc["media-type"] +
      ";base64," +
      coverEntry.getData().toString("base64") +
      ""
    : undefined;
  const spines = $opf("spine itemref")
    .map(function () {
      return manifests[$opf(this).attr("idref")].href;
    })
    .get();

  return {
    title,
    language,
    cover,
    opf,
    manifests,
    spines,
    bookPath,
  };
}

if (process.env.BOOK_PATH) {
  const manager = new TranslateManager("ko", process.env.BOOK_PATH, "papago");
  const jobs = manager.getJobs();

  (async () => {
    for (const job of jobs) {
      console.log(job.name + " 중...");
      await job.execute();
    }
  })().catch((e) => {
    console.error(e);
  });
}

function getCoverId($: CheerioStatic) {
  const item = $('manifest item[media-type="image/jpeg"]');
  if (item.length) {
    return item.attr("id");
  }
  const meta = $('meta[name="cover"]');

  if (meta.length) {
    return meta.attr("content");
  }
}
