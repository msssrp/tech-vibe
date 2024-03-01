import { create } from "zustand";
interface EditorState {
  content: string;
  saveStatus: string;
  setContent: (newContent: string) => void;
  setSaveStatus: (status: string) => void;
}
export const useEditorStore = create<EditorState>((set) => ({
  content: "",
  setContent: (newContent: string) => set({ content: newContent }),
  saveStatus: "",
  setSaveStatus: (status: string) => set({ saveStatus: status }),
}));
