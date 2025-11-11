"use client"

import Image from 'next/image'
import Link from 'next/link'
import styles from "./Card.module.scss";
import ProgressBar from './ProgressBar';
import Genre from './Genre';
import { useGenreStore } from '@/store/GenreStore';
import { useEffect } from 'react';
import { LineBreaker } from '../utils/LineBreaker';

type Props = {
    title: string;
    genre_ids: number[];
    release_date: string;
    vote_average: number;
    poster_path: string;
    movie_id: number
} 

const Card = ({title, genre_ids, release_date, vote_average, poster_path, movie_id}: Props) => {
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
    const { setGenres, getGenreNameById } = useGenreStore();
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    useEffect(() => {
        async function getGenres () {
            const res = await fetch (
                `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`,
                { cache: "no-store"}
            );
            const data = await res.json();
            setGenres(data.genres)
        }

        getGenres();
    }, [])
    
    return (
        <section className={styles["card"]}>
            <Link href={`/movies/${movie_id}`}>
                <div className={styles["card__image"]}>
                    <Image 
                        src={poster_path ? `${IMAGE_BASE_URL}/${poster_path}` : "/images/backup-bg.png"} 
                        alt='Card' 
                        width={400} 
                        height={270}
                    >
                    </Image>
                    <div className={styles["card__hover"]}>
                        <p className={`${styles["movie-title"]} text-preset-5`}>{title}</p>
                        <p className={`${styles["release-date"]} text-preset-5`}>{release_date?.slice(0,4)}</p>
                        <ProgressBar value={vote_average} />
                        <ul className={styles["genre-list"]}>
                            {
                                genre_ids?.slice(0, 2).map((genreId) => (
                                <li 
                                    className={`${styles["genre-list__item"]} text-preset-6`}
                                    key={genreId}
                                >
                                    <Genre text={getGenreNameById(genreId)}/>
                                </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className={styles["card__content"]}>
                    <p className={`${styles["card__title"]} text-preset-5`}>
                        {LineBreaker(title)}
                    </p>
                </div>
            </Link> 
         </section>
    )
}

export default Card