"use client"

import { Cast } from "@/types/CastTypes";
import styles from "./MovieActors.module.scss";
import { FixLinkText } from "@/components/utils/FixLinkText";
import Link from "next/link";
import Image from "next/image";
import { IMAGE_BASE_URL } from "@/constants/tmdb";
import { useState } from "react";

type Props = {
    cast: Cast[];
}

const MovieActors = ({cast}: Props) => {
    const [toggleShowAll, setToggleShowAll] = useState<number>(9)

    const handleToggle = () => {
        if(toggleShowAll === 9) {
            setToggleShowAll(cast.length)
        } else {
            setToggleShowAll(9)
        }
    }
    return (
        <div className={styles["movie-actors"]}>
            <h2 className="title">Actors</h2>
            <article className={`${styles["movie-actors__wrapper"]} ${toggleShowAll === 9 ? styles["collapsed"] : styles["expanded"]}`}>
                {
                    cast.slice(0, toggleShowAll).map((actor) => (
                        <section 
                            key={actor.cast_id} 
                            className={styles["movie-actors__card"]}
                        >
                            <Link href={`/actors/${FixLinkText(actor.name)}`}>
                                <div className={styles["movie-actors__image"]}>
                                    <Image
                                        src={actor.profile_path ? `${IMAGE_BASE_URL}${actor.profile_path}` : "/images/backup-bg.png"}
                                        alt={actor.name}
                                        width={200}
                                        height={300}
                                    />
                                </div>
                                <div className={styles["movie-actors__info"]}>
                                    <h3 className={`${styles["movie-actors__name"]} text-preset-5`}>{actor.name}</h3>
                                    <span className={`${styles["movie-actors__character"]} text-preset-6`}>({actor.character})</span>
                                </div>
                            </Link>
                        </section>
                    ))
                }
            </article>
            {
                cast.length > 9 && (
                    <button 
                        type="button"
                        className={`${styles["show-more"]} text-preset-5`}
                        aria-label={toggleShowAll === 9 ? "Show more" : "Show less"}
                        onClick={handleToggle}
                    >
                        { toggleShowAll === 9 ? "Show all actors" : "Show fewer" }
                    </button>
                )
            }

        </div>
    )
}

export default MovieActors