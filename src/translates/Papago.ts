import TranslateAPI from "./TranslateAPI";
import PreferenceManager from "../preload/PreferenceManager";
import axios from "axios";

class Papago extends TranslateAPI {
  constructor() {
    super(
      "papago",
      {
        ko: [
          "en",
          "ja",
          "zh-CN",
          "zh-TW",
          "vi",
          "id",
          "th",
          "de",
          "ru",
          "es",
          "it",
          "fr",
        ],
        en: ["ja", "fr", "zh-CN", "zh-TW", "ko"],
        ja: ["ko", "zh-CN", "zh-TW", "en"],
        "zh-CH": ["zh-TW", "ko", "en", "ja"],
        "zh-TW": ["zh-CH", "en", "ja", "ko"],
        fr: ["ko", "en"],
        it: ["ko"],
        es: ["ko"],
        ru: ["ko"],
        de: ["ko"],
        th: ["ko"],
        id: ["ko"],
        vi: ["ko"],
      },
      [
        { name: "API 키", id: "papago_api_key" },
        { name: "API 비밀 키", id: "papago_api_password" },
      ]
    );
  }
  async translate(from: string, to: string, text: string) {
    if (!super.isSupport(from, to))
      throw new Error("지원하지 않는 언어입니다.");
    const apiKey = PreferenceManager.get("papago_api_key");
    const apiSecret = PreferenceManager.get("papago_api_password");

    const request = await axios.post(
      "https://naveropenapi.apigw.ntruss.com/nmt/v1/translation",
      { source: from, target: to, text },
      {
        headers: {
          "X-NCP-APIGW-API-KEY-ID": apiKey,
          "X-NCP-APIGW-API-KEY": apiSecret,
        },
      }
    );

    return request.data.translatedText;
  }
}

export default Papago;
