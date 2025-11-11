"use client"

import { useEffect, useState } from 'react';
import styles from "./HeroSection.module.scss";
import Image from 'next/image';
import { UpcomingMovie } from '@/types/UpcomingMovieTypes';
import Link from 'next/link';



const HeroSection = () => {
    const [upComingMovies, setUpcomingMovies] = useState<UpcomingMovie[] | undefined>([]);
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

    useEffect(() => {
        async function getUpcomingMovies () {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`);
                if(!response.ok) throw new Error("Hata");
                const data = await response.json();
                setUpcomingMovies(data.results)
                console.log(data.results)
            } catch (err) {
                console.log("error message", err)
            }

        }

        getUpcomingMovies();
    }, [])

  return (
    <div className={`${styles["hero-section"]} container`}>
        <article className={styles["wrapper"]}>
            {
                upComingMovies?.slice(0, 5).map((movie) => ( 
                    <section className={styles["upcoming-movie"]}>
                        <Link href={"/"}>
                            <img src={`${IMAGE_BASE_URL}/${movie.poster_path}`} alt={movie.original_title} />
                            <div className={styles.content}>
                                <div className={styles.rating}>
                                    <p>7.1</p>
                                </div>
                            </div>

                        </Link>
                    </section>
                ))
            }
        </article>
    </div>
  )
}

export default HeroSection