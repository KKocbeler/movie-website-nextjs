"use client";

import Image from "next/image";
import "./MovieGallery.scss";
import { MovieImages } from "@/types/MovieImages";
import { IMAGE_BASE_URL } from "@/constants/tmdb";
import { useState } from "react";


import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";


type Props = {
    images: MovieImages[]
}

const MovieGallery = ({images}: Props) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    return (
        <section className="movie-overview__gallery">
            <h2 className="title">Trailers & More</h2>
            <div className="movie-overview__images">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Thumbs]}
                    className="main-swiper"
                    loop={true}
                >
                    {images.slice(0, 9).map((img, index) => (
                        <SwiperSlide key={index}>
                            <Image
                                src={`${IMAGE_BASE_URL}${img.file_path}`}
                                alt="movie backdrop"
                                width={img.width}
                                height={img.height}
                                className="main-image"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Thumbs]}
                    className="thumbs-swiper"
                >
                    {images.slice(0, 9).map((img, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            src={`${IMAGE_BASE_URL}${img.file_path}`}
                            alt="movie thumbnail"
                            width={100}
                            height={100}
                            className="thumbs"
                        />
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default MovieGallery