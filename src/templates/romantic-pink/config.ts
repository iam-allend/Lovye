// PATH: src/templates/romantic-pink/config.ts
import type { TemplateConfig } from "@/types";

export const romanticPinkConfig: TemplateConfig = {
  id: "romantic-pink",
  name: "Romantic Pink",
  category: "anniversary",
  transition: "slide-up",
  defaultMusic: "romantic-1",

  globalDefaults: {
    ambientAnimation: "petals",
    background: { type: "gradient", value: "linear-gradient(160deg,#fff5f7,#fffcf8,#f8f5ff)" },
    accentColor: "#f0415a",
    fontStyle: "serif",
    music: "romantic-1",
  },

  customizableOptions: {
    ambientAnimations: ["petals", "hearts", "sparkles", "none"],
    backgrounds: [
      { type: "gradient", value: "linear-gradient(160deg,#fff5f7,#fffcf8,#f8f5ff)" },
      { type: "gradient", value: "linear-gradient(160deg,#f8f5ff,#fffcf8,#fff5f7)" },
      { type: "gradient", value: "linear-gradient(160deg,#fffdf7,#fff5f7)" },
      { type: "solid", value: "#fffcf8" },
    ],
    accentColors: ["#f0415a", "#c4aeff", "#ffb8cb", "#f9906a"],
    fontStyles: ["serif", "script"],
    musics: ["romantic-1", "romantic-2", "calm-1", "none"],
  },

  scenes: [
    {
      id: "opening",
      type: "opening",
      blockType: "opening-minimal",
      label: "Pembuka",
      navigationMode: "button",
      transition: "fade",
      fields: [
        { name: "title",    type: "text",     label: "Judul Utama",    required: true,  placeholder: "Happy Anniversary, Sayang", maxLength: 60 },
        { name: "subtitle", type: "text",     label: "Subjudul",       required: false, placeholder: "untuk kamu yang selalu ada", maxLength: 80 },
        { name: "date",     type: "date",     label: "Tanggal Spesial",required: false },
      ],
    },
    {
      id: "gallery",
      type: "gallery",
      blockType: "gallery-grid",
      label: "Foto Kenangan",
      navigationMode: "button",
      transition: "slide-left",
      fields: [
        { name: "photos",  type: "images", label: "Upload Foto (maks. 5)", maxFiles: 5 },
        { name: "caption", type: "text",   label: "Caption Galeri", placeholder: "momen-momen kita", maxLength: 100 },
      ],
    },
    {
      id: "message",
      type: "message",
      blockType: "message-card",
      label: "Pesan Hati",
      navigationMode: "button",
      transition: "zoom-in",
      fields: [
        { name: "body", type: "textarea", label: "Tulis Pesanmu", required: true, placeholder: "Terima kasih sudah menjadi bagian dari hidupku...", maxLength: 1000 },
        { name: "from", type: "text",     label: "Dari",          placeholder: "dari aku, untukmu", maxLength: 40 },
      ],
    },
    {
      id: "closing",
      type: "closing",
      blockType: "closing-simple",
      label: "Penutup",
      navigationMode: "swipe",
      transition: "fade",
      fields: [
        { name: "closing_text", type: "text", label: "Kalimat Penutup", placeholder: "dengan sepenuh hati", maxLength: 80 },
      ],
    },
  ],
};