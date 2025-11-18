import { MovieImages } from "@/types/MovieImages";
import styles from "./DetailOverview.module.scss";
import MovieGallery from "./DetailGallery";

type Props = {
    overview: string;
    images: MovieImages[];
}

const DetailOverview = ({overview, images}: Props) => {
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

export default DetailOverview