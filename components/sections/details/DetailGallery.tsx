"use client";

import Image from "next/image";
import "./DetailGallery.scss";
import { MovieImages } from "@/types/MovieImages";
import { IMAGE_BASE_URL } from "@/constants/tmdb";
import { useEffect, useState } from "react";


import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import { IoCloseOutline } from "react-icons/io5";

type selectedImage = {
    src: string;
    width: number; 
    height: number;
    alt: string;
}


type Props = {
    images: MovieImages[]
}

const DetailGallery = ({images}: Props) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [selectedImage, setSelectedImage] = useState<selectedImage | null>(null);

    useEffect(() => {
        const body = document.querySelector("body");
        if (body) {
            if (selectedImage) {
            body.style.overflow = "hidden";
            } else {
            body.style.overflow = "";
            }
        }
    }, [selectedImage]);

    return (
        <>
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
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <Image
                                src={`${IMAGE_BASE_URL}${img.file_path}`}
                                alt="movie backdrop"
                                width={img.width}
                                height={img.height}
                                className="main-image"
                                onClick={() => setSelectedImage({
                                    src: `${IMAGE_BASE_URL}${img.file_path}`,
                                    width: img.width,
                                    height: img.height,
                                    alt: "movie backdrop"
                                })}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    watchSlidesProgress={true}
                    modules={[Thumbs]}
                    className="thumbs-swiper"
                >
                    {images.map((img, index) => (
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
        <div className={`big-image ${selectedImage ? "visible" : ""}`}>
            <Image
                src={selectedImage?.src || "/images/backup-bg.png"}
                alt={selectedImage?.alt || "Movie's backdrop image"}
                width={selectedImage?.width || 1920}   
                height={selectedImage?.height || 1080} 
            />
            <button type="button" onClick={() => setSelectedImage(null)}>
                <IoCloseOutline />
            </button>
        </div>
        </>
    )
}

export default DetailGallery