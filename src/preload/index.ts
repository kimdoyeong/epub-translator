import * as Dialog from "./dialog";
import * as Parsing from "./parsing";
import PreferenceManager from "./PreferenceManager";
import translate from "./translate";

const preloads = {
  Dialog,
  Parsing,
  PreferenceManager,
  translate,
};

export type PreloadType = typeof preloads;

(window as any).preloads = preloads;
