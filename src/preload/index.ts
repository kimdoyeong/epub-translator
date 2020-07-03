import * as Dialog from "./dialog";

const preloads = {
  Dialog,
};

export type PreloadType = typeof preloads;

(window as any).preloads = preloads;
