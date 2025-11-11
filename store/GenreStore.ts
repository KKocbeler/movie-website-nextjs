import { create } from 'zustand';

type Genre = {
  id: number;
  name: string;
};

type GenreState = {
  genres: Genre[];
  setGenres: (newGenres: Genre[]) => void;
  getGenreNameById: (id: number) => string;
};

export const useGenreStore = create<GenreState>((set, get) => ({
    genres: [],
    setGenres: (newGenres) => set({ genres: newGenres }),

    getGenreNameById: (id: number) => {
        const genres = get().genres || [];
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : 'Unknown';
    },
}));