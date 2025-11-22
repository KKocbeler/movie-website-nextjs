import styles from "../../page.module.css";
import { MainSwiperClient, HomeSwiperClient } from "@/components/wrappers/HomeClientWrapper";

export default async function Home() {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`,
        { next: { revalidate: 86400 } }
    );
    const data = await res.json();

    const genreIdsToShow = [16, 14, 18, 27];

    const moviesByGenre = await Promise.all(
        genreIdsToShow.map(async (id) => {
            const res = await fetch(
                `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${id}&language=en-US&page=1`,
                { next: { revalidate: 7200 } }
            );
            const data = await res.json();
            return data.results.slice(0, 12);
        })
    );

    const resUpcoming = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`,
        { next: { revalidate: 7200 } }
    );
    const upcomingMovies = (await resUpcoming.json()).results.slice(0, 12);

    return (
        <div className={styles.page}>
            <MainSwiperClient upcomingMovies={upcomingMovies} />
            {genreIdsToShow.map((id, index) => {
                const genreName = data.genres.find((g: any) => g.id === id)?.name || "Genre";
                return <HomeSwiperClient key={id} id={id} genre={genreName} movies={moviesByGenre[index]} />;
            })}
        </div>
    );
}
