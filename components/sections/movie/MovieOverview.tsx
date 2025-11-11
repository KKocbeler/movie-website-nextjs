import { MovieImages } from "@/types/MovieImages";
import styles from "./MovieOverview.module.scss";
import Image from "next/image";
import MovieGallery from "./MovieGallery";

type Props = {
    overview: string;
    images: MovieImages[];
}

const MovieOverview = ({overview, images}: Props) => {
    return (
        <div className={styles["movie-overview"]}>
            <section className={styles["movie-overview__story-line"]}>
                <h2 className="title">StoryLine</h2>
                <p>{overview}</p>
            </section>
            <MovieGallery images={images}/>
        </div>
    )
}

export default MovieOverview