import * as Dialog from "./dialog";
import * as Parsing from "./parsing";
import PreferenceManager from "./PreferenceManager";

const preloads = {
  Dialog,
  Parsing,
  PreferenceManager,
};

export type PreloadType = typeof preloads;

(window as any).preloads = preloads;
