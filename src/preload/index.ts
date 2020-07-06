import * as Dialog from "./dialog";
import * as Parsing from "./parsing";
import PreferenceManager from "./PreferenceManager";
import translate from "./translate";
import Store from "./Store";
import TranslateManager from "./TranslateManager";

const preloads = {
  Dialog,
  Parsing,
  PreferenceManager,
  translate,
  Store,
  TranslateManager,
};

export type PreloadType = typeof preloads;

(window as any).preloads = preloads;
