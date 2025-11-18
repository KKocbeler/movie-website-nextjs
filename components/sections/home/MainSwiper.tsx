"use client"

import "./MainSwiper.scss";
import { Navigation, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useEffect, useState } from "react";
import { UpcomingMovie } from "@/types/UpcomingMovieTypes";
import Link from "next/link";
import { useGenreStore } from "@/store/GenreStore";
import Genre from "@/components/ui/Genre";
import { IMAGE_BASE_URL } from "@/constants/tmdb";
import CardSkeleton from "@/components/ui/CardSkeleton";
import ErrorPage from "@/components/ui/ErrorPage";


const MainSwiper = () => {
    const [upComingMovies, setUpcomingMovies] = useState<UpcomingMovie[] | undefined>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const getGenresName = useGenreStore((state) => state.getGenreNameById)

    useEffect(() => {
        
        async function getUpcomingMovies () {
            setLoading(true)

            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`);
                console.log(response)
                if(!response.ok) throw new Error("Fetch Failed");

                const data = await response.json();
                
                setUpcomingMovies(data.results)
                console.log(data)
            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }

        }

        getUpcomingMovies();
    }, [])

    if(error) return <ErrorPage />
    console.log(error)
    return (
        <article className="upcoming-wrapper container">
            <Swiper
                modules={[Navigation, Autoplay, A11y]}
                spaceBetween={12}
                slidesPerView={1} 
                slidesPerGroup={1}
                navigation
                loop
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false
                }}
                breakpoints={{
                    768: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                        slidesPerGroup: 2
                    },
                    1280: {
                        slidesPerView: 4,
                        slidesPerGroup: 2
                    }
                }}
            >
                {
                    loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <SwiperSlide key={i}>
                                <CardSkeleton />
                            </SwiperSlide>
                        ))
                    ) : (
                        upComingMovies?.slice(0, 8).map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <Link href={`/movies/${movie.id}`}>
                                    <section className="upcoming-movie">
                                        <figure className="upcoming-movie__image">
                                            <img src={`${IMAGE_BASE_URL}/${movie.poster_path}`} alt="" />
                                            <figcaption className="sr-only">{movie.title}</figcaption>
                                        </figure>
                                        <div className="upcoming-movie__content">
                                            <p className="movie-title text-preset-5">{movie.title}</p>
                                            <ul className="movie-genre-list">
                                                {
                                                    movie.genre_ids.slice(0, 2).map((genreId) => {
                                                        const genreName = getGenresName ? getGenresName(genreId) : "Loading...";
                                                        return (
                                                            <li className="movie-genre-list__item text-preset-6" key={genreId}>
                                                                <Genre text={genreName}></Genre>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                        <div className="upcoming-badge">
                                            <p className="text-preset-6">Upcoming</p>
                                        </div>
                                    </section>
                                </Link>
                            </SwiperSlide>
                        ))
                    )
                }

            </Swiper>
        </article>
    )
}

export default MainSwiper

