import { HydrateGenres } from "@/components/api/HydrateGenres";
import styles from "../../page.module.css";
import MainSwiper from "@/components/sections/home/MainSwiper";
import HomeSwiper from "@/components/ui/HomeSwiper";

export default async function Home() {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const res = await fetch (
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`,
        { cache: "no-store"}
    );
    const data = await res.json();

    const genreIdsToShow = [16, 14, 18, 27];

    const moviesByGenre = await Promise.all(
        genreIdsToShow.map(async (id) => {
            const res = await fetch(
                `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${id}&language=en-US&page=1`,
                { cache: "no-store" }
            );
            const data = await res.json();
            return data.results;
        })
    )

    return (
        <div className={styles.page}>
            <HydrateGenres genres={data.genres} />
            <MainSwiper />

            {genreIdsToShow.map((id, index) => {
                const genreName = data.genres.find((g: any) => g.id === id)?.name || "Genre";
                return <HomeSwiper key={id} id={id} genre={genreName} movies={moviesByGenre[index]} />;
            })}
        </div>
    );
}
