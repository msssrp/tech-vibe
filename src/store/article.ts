import { articleProps } from "@/types/article/article";
import { create } from "zustand";

interface EditorState {
  article: articleProps;
  saveStatus: string;
  setSaveStatus: (status: string) => void;
  updateArticle: (updatedArticle: articleProps) => void;
}
export const useEditorStore = create<EditorState>((set) => ({
  saveStatus: "write",
  setSaveStatus: (status: string) => set({ saveStatus: status }),
  article: {
    article_id: "",
    article_title: "",
    article_description: "",
    article_cover: "",
    article_content: "",
    article_status: "",
    user_id: "",
    article_claim: false,
  },
  updateArticle: (updatedArticle) =>
    set((state) => ({
      ...state,
      article: { ...state.article, ...updatedArticle },
    })),
}));
