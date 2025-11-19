import { create } from "zustand";

type SearchState = {
    searchType: string;
    allTypes: string[];
    setSearchType:(newtype: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
    searchType: "",
    allTypes: ["All", "Movies", "TV Series"],
    setSearchType: (newType) => set({ searchType: newType}),
}))