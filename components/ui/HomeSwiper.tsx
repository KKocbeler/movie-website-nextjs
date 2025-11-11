"use client"

import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "./HomeSwiper.scss";


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Link from 'next/link';
import Card from './Card';
import H2 from './H2';
import { Movie } from '@/types/MovieType';
import { useEffect, useState } from 'react';
import CardSkeleton from './CardSkeleton';

type Props = {
    id: number;
    genre: string;
    movies: Movie[];
}

export default ({id, genre, movies}: Props) => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsClient(true)
        }, 3000);
        
    }, [])
  return (
    <section className='container'>
        <Link href={"/"}>
            <H2 text={genre}/>
        </Link>
        
        <article className='genre-movies'>
            <Swiper
                modules={[Navigation, A11y]}
                spaceBetween={15}
                slidesPerView={2}
                slidesPerGroup={2}
                navigation
                loop
                breakpoints={{ 
                    768: { slidesPerView: 3 },  
                    1024: { slidesPerView: 4 }, 
                    1280: { slidesPerView: 5 } 
                }}
            >
            {isClient
                ? movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                    <Card 
                        genre_ids={movie.genre_ids}
                        movie_id={movie.id} 
                        poster_path={movie.poster_path} 
                        release_date={movie.release_date} 
                        title={movie.title} 
                        vote_average={movie.vote_average}
                    />
                    </SwiperSlide>
                ))
                : Array.from({ length: 5 }).map((_, i) => (
                    <SwiperSlide key={i}>
                        <CardSkeleton />
                    </SwiperSlide>
                ))
            }
            </Swiper>
        </article>
    </section>
  );
};