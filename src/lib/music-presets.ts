import type { MusicPreset } from "@/types";

// All audio files should be placed in /public/music/
// Use royalty-free music only (e.g. from pixabay.com/music)
export const MUSIC_PRESETS: MusicPreset[] = [
  {
    id: "romantic-1",
    label: "Soft Romance",
    file: "/music/soft-romance.mp3",
    mood: "romantic",
  },
  {
    id: "romantic-2",
    label: "Dear You",
    file: "/music/dear-you.mp3",
    mood: "romantic",
  },
  {
    id: "happy-1",
    label: "Sunny Day",
    file: "/music/sunny-day.mp3",
    mood: "happy",
  },
  {
    id: "happy-2",
    label: "Celebration",
    file: "/music/celebration.mp3",
    mood: "happy",
  },
  {
    id: "calm-1",
    label: "Gentle Piano",
    file: "/music/gentle-piano.mp3",
    mood: "calm",
  },
  {
    id: "sad-1",
    label: "Letting Go",
    file: "/music/letting-go.mp3",
    mood: "sad",
  },
  {
    id: "energetic-1",
    label: "Proud Moment",
    file: "/music/proud-moment.mp3",
    mood: "energetic",
  },
  {
    id: "none",
    label: "Tanpa Musik",
    file: "",
    mood: "calm",
  },
];

export function getMusicById(id: string): MusicPreset | undefined {
  return MUSIC_PRESETS.find((m) => m.id === id);
}

export function getMusicByMood(mood: MusicPreset["mood"]): MusicPreset[] {
  return MUSIC_PRESETS.filter((m) => m.mood === mood && m.id !== "none");
}