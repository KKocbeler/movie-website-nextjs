"use client"

import { useEffect, useState } from "react"
import Card from "@/components/ui/Card";
import styles from "./page.module.scss";
import Pagination from "@/components/ui/Pagination";
import CardSkeleton from "@/components/ui/CardSkeleton";
import { Movie } from "@/types/MovieType";

const MoviesPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState<number>(1);
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        async function getMovieList () {
            setLoading(true)
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`)

                if(!response.ok) throw new Error("Api çekilemedi");

                const data = await response.json();

                setMovies(data.results);

                console.log(data)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        getMovieList()
    }, [page])

    if(error) return <p>{error}</p>

    return (
        <section className={`${styles["movies"]} container`}>
            <h1 className="text-preset-2">Movies</h1>
            <article className={styles["movies-wrapper"]}>
                {loading ? (
                    <CardSkeleton />
                    ) : (
                    movies.map((movie) => (
                            <Card
                                key={movie.id}
                                genre_ids={movie.genre_ids}
                                poster_path={movie.poster_path}
                                release_date={movie.release_date}
                                title={movie.title}
                                vote_average={movie.vote_average}
                                movie_id= {movie.id}
                            />
                    ))
                )}
            </article>
            <Pagination 
                currentPage={page} 
                totalPages={20}  
                setPage={setPage}
            />
        </section>
    )
}

export default MoviesPage