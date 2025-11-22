"use client"

import Image from 'next/image'
import styles from "./Card.module.scss";
import ProgressBar from './ProgressBar';
import Genre from './Genre';
import { useGenreStore } from '@/store/GenreStore';
import { LineBreaker } from '../utils/LineBreaker';
import { IMAGE_BASE_URL } from '@/constants/tmdb';

type Props = {
    title: string | undefined;
    genre_ids: number[];
    release_date: string;
    vote_average: number;
    poster_path: string;
    listItem_id: number;
}

const Card = ({title, genre_ids, release_date, vote_average, poster_path}: Props) => {
    const { getGenreNameById } = useGenreStore();

    return (
        <section className={styles["card"]}>
                <div className={styles["card__image"]}>
                    <Image 
                        src={poster_path ? `${IMAGE_BASE_URL}/${poster_path}` : "/images/backup-bg.png"} 
                        alt='Card' 
                        width={270} 
                        height={380}
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
                    <p className={`${styles["card__title"]}`}>
                        {LineBreaker(title || "unknown")}
                    </p>
                </div>
         </section>
    )
}

export default Card