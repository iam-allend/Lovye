import type { TemplateRegistryEntry } from "@/templates/_base/types";
import { romanticPinkConfig } from "./config";
import { OpeningScene } from "./scenes/OpeningScene";
import { GalleryScene } from "./scenes/GalleryScene";
import { MessageScene } from "./scenes/MessageScene";
import { ClosingScene } from "./scenes/ClosingScene";

export const romanticPinkEntry: TemplateRegistryEntry = {
  config: romanticPinkConfig,
  scenes: {
    opening: OpeningScene,
    gallery: GalleryScene,
    message: MessageScene,
    closing: ClosingScene,
  },
};