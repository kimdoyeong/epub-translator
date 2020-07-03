import * as Dialog from "./dialog";
import * as Parsing from "./parsing";

const preloads = {
  Dialog,
  Parsing,
};

export type PreloadType = typeof preloads;

(window as any).preloads = preloads;
