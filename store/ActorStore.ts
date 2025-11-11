import { create } from "zustand";

type Actor = {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
}

type ActorState = {
    actors: Actor[];
    setActors: (newActor: Actor[]) => void;
    getActorsById: (id: number) => Actor | undefined;
}



export const useActorStore = create<ActorState>((set, get) => ({
    actors: [],
    setActors: (newActors) => set({ actors: newActors}),
    getActorsById: (id: number) => {
        const actors = get().actors || [];
        const actor = actors.find((a: Actor) => a.id === id)
        return actor;
    }
}))