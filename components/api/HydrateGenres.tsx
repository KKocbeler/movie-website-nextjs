"use client"

import { useGenreStore } from "@/store/GenreStore";
import { useEffect } from "react";

type Genre = {
    id: number;
    name: string;
}

type Props = {
    genres: Genre[]
}

export function HydrateGenres( {genres}: Props ) {
    const { setGenres } = useGenreStore();

    useEffect(() => {
        setGenres(genres);
    }, [genres, setGenres])

    return null;
}