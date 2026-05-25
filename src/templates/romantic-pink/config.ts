// ============================================================
// TEMPLATE: Romantic Pink
// Category: anniversary · valentine · confess
// Scenes: opening → gallery → message → closing
// ============================================================
import type { TemplateConfig } from "@/templates/_base/types";

export const romanticPinkConfig: TemplateConfig = {
  id: "romantic-pink",
  name: "Romantic Pink",
  category: "anniversary",
  transition: "fade",
  defaultMusic: "romantic-1",

  scenes: [
    {
      id: "opening",
      type: "opening",
      label: "Pembuka",
      fields: [
        {
          name: "title",
          label: "Judul Utama",
          type: "text",
          required: true,
          placeholder: "Happy Anniversary, Sayang",
          maxLength: 60,
        },
        {
          name: "subtitle",
          label: "Subjudul",
          type: "text",
          placeholder: "untuk kamu yang selalu ada",
          maxLength: 80,
        },
        {
          name: "date",
          label: "Tanggal Spesial",
          type: "date",
        },
      ],
    },
    {
      id: "gallery",
      type: "gallery",
      label: "Foto Kenangan",
      fields: [
        {
          name: "photos",
          label: "Upload Foto (maks. 5)",
          type: "images",
          maxFiles: 5,
        },
        {
          name: "caption",
          label: "Caption Galeri",
          type: "text",
          placeholder: "momen-momen kita bersama",
          maxLength: 100,
        },
      ],
    },
    {
      id: "message",
      type: "message",
      label: "Pesan Hati",
      fields: [
        {
          name: "body",
          label: "Tulis Pesanmu",
          type: "textarea",
          required: true,
          placeholder: "Terima kasih sudah menjadi bagian dari hidupku...",
          maxLength: 1000,
        },
        {
          name: "from",
          label: "Dari",
          type: "text",
          placeholder: "dari aku, untukmu",
          maxLength: 40,
        },
      ],
    },
    {
      id: "closing",
      type: "closing",
      label: "Penutup",
      fields: [
        {
          name: "closing_text",
          label: "Kalimat Penutup",
          type: "text",
          placeholder: "dengan sepenuh hati",
          maxLength: 80,
        },
        {
          name: "music",
          label: "Musik Latar",
          type: "music",
        },
      ],
    },
  ],
};