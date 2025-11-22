"use client";

import "./MainSwiper.scss";
import { Navigation, Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Link from "next/link";
import Image from "next/image";
import { IMAGE_BASE_URL } from "@/constants/tmdb";
import { UpcomingMovie } from "@/types/UpcomingMovieTypes";
import Genre from "@/components/ui/Genre";
import { useGenreStore } from "@/store/GenreStore";

type Props = {
    upcomingMovies: UpcomingMovie[];
};

const MainSwiper = ({ upcomingMovies }: Props) => {
    const getGenresName = useGenreStore((state) => state.getGenreNameById)

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
                    upcomingMovies?.slice(0, 16).map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <Link href={`/movies/${movie.id}`}>
                                <section className="upcoming-movie">
                                    <figure className="upcoming-movie__image">
                                        <Image src={`${IMAGE_BASE_URL}/${movie.poster_path}`} alt={`${movie.title}'s poster image`} width={350} height={500} loading="eager"/>
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
                }
            </Swiper>
        </article>
    )
}

export default MainSwiper

