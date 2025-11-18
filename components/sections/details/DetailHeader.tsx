import Image from "next/image";
import styles from "./DetailHeader.module.scss";
import { GoDotFill } from "react-icons/go";
import { MdOutlineStar } from "react-icons/md";
import { BiLogoPlayStore } from "react-icons/bi";
import { MovieImages } from "@/types/MovieImages";
import { IMAGE_BASE_URL } from "@/constants/tmdb";

type Props = {
    poster_path: string;
    title: string;
    runtime: number;
    release_date: string;
    genres: {id: number, name:string}[]
    vote_average: number;
    image: MovieImages
}

const DetailHeader = ({poster_path, title, runtime, release_date, genres, vote_average, image}: Props) => {

    return (
        <div className={styles["movie-header"]}>
            <div className={styles["bg-image"]}>
                <Image
                    src={`${IMAGE_BASE_URL}/${image.file_path}`}
                    width={image.width}
                    height={image.height}
                    alt="Movie's poster image"
                />
            </div>
            <div className={styles["movie-header__image"]}>
                <Image 
                    className={styles["poster-img"]} 
                    src={`${IMAGE_BASE_URL}/${poster_path}`} 
                    alt="up"
                    width={500}
                    height={500}
                />
            </div>
            <div className={styles["movie-header__content"]}>
                <h1 className="text-preset-2">{title}</h1>
                <ul className={styles["movie-header__list"]}>
                    <li>{release_date?.slice(0, 4)}</li>
                    <li><GoDotFill /> {runtime} MIN</li>
                    <li>
                        <GoDotFill />
                        {
                            genres?.map((genre, index) => (
                                <span key={genre.id}>
                                    {genre.name.toUpperCase()}
                                    {index < genres.length - 1 ? "," : ""}
                                </span>
                            ))
                        }
                    </li>
                </ul>
                <div className={styles["movie-header__rate"]}>
                    <p className="text-preset-1"> <span className={styles["movie-rate"]}>{vote_average?.toFixed(1)}</span> / 10 </p>
                    <MdOutlineStar />
                </div>
                <div className={styles["movie-header__buttons"]}>
                    <button
                        type="button"
                        aria-label="Add to wishlist"
                    >
                        <BiLogoPlayStore /> Add to Wishlist
                    </button>
                    <button
                        type="button"
                        aria-label="Rate"
                    >
                        <MdOutlineStar /> Rate
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DetailHeader