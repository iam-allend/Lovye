import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { EditorState, PageCustomData, TemplateConfig } from "@/types";
import type { Json } from "@/types/database";



type EditorActions = {
  initEditor: (templateId: string, config: TemplateConfig, initialData?: PageCustomData) => void;
  setCurrentScene: (index: number) => void;
  updateField: (sceneId: string, fieldName: string, value: Json) => void;
  setIsSaving: (saving: boolean) => void;
  resetEditor: () => void;
};

const initialState: EditorState = {
  templateId: "",
  templateConfig: { scenes: [] },  // ← tetap sama, sudah aman
  currentSceneIndex: 0,
  customData: {},
  isDirty: false,
  isSaving: false,
};

export const useEditorStore = create<EditorState & EditorActions>()(
  immer((set) => ({
    ...initialState,

    initEditor: (templateId, templateConfig, initialData = {}) => {
      set((state) => {
        state.templateId = templateId;
        state.templateConfig = templateConfig;
        state.customData = initialData;
        state.currentSceneIndex = 0;
        state.isDirty = false;
        state.isSaving = false;
      });
    },

    setCurrentScene: (index) => {
      set((state) => {
        state.currentSceneIndex = index;
      });
    },

    // customData is flat: { sceneId_fieldName: value }
    // e.g. { "opening_title": "Happy Birthday!", "opening_subtitle": "Sayang" }
    updateField: (sceneId, fieldName, value) => {
      set((state) => {
        const key = `${sceneId}_${fieldName}`;
        state.customData[key] = value;
        state.isDirty = true;
      });
    },

    setIsSaving: (saving) => {
      set((state) => {
        state.isSaving = saving;
        if (!saving) state.isDirty = false;
      });
    },

    resetEditor: () => {
      set(initialState);
    },
  }))
);

// Selector helpers — keeps components clean
export const selectCurrentScene = (state: EditorState) =>
  state.templateConfig.scenes[state.currentSceneIndex] ?? null;

export const selectFieldValue = (
  state: EditorState,
  sceneId: string,
  fieldName: string
) => state.customData[`${sceneId}_${fieldName}`] ?? "";