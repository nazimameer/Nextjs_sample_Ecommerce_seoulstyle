import { create } from "zustand";
import { SearchState } from "./interface";

export const useSearchStore = create<SearchState>((set) => ({
  search: "",
  showSearch: false,
  setSearch: (value) => set({ search: value }),
  toggleShowSearch: () => set((state) => ({ showSearch: !state.showSearch })),
}));
