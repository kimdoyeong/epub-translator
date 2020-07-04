type SupportLanguageType = {
  [from: string]: string[];
};

abstract class TranslateAPI {
  name: string;
  supportLanguages: SupportLanguageType;

  constructor(name: string, supportLanguages: SupportLanguageType) {
    this.name = name;
    this.supportLanguages = supportLanguages;
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
