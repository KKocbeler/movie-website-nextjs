"use client"

import { Cast } from "@/types/CastTypes";
import styles from "./DetailActors.module.scss";
import { FixLinkText } from "@/components/utils/FixLinkText";
import Link from "next/link";
import Image from "next/image";
import { IMAGE_BASE_URL } from "@/constants/tmdb";
import { useState } from "react";

type Props = {
    cast: Cast[];
}

const DetailActors = ({cast}: Props) => {
    const [toggleShowAll, setToggleShowAll] = useState<number>(8)

    const allCast = cast.length;
    const addValue = 8;
    const handleToggle = () => {
        const currentLength = Math.min(allCast, toggleShowAll)

        if(allCast > currentLength) {
            setToggleShowAll(prev => prev + addValue)
        } else {
            setToggleShowAll(8)
        }
    }
    return (
        <div className={styles["movie-actors"]}>
            <h2 className="title">Actors</h2>
            <article className={styles["movie-actors__wrapper"]}>
                {
                    cast.slice(0, toggleShowAll).map((actor, index) => (
                        <section 
                            key={index} 
                            className={styles["movie-actors__card"]}
                        >
                            <Link href={`/actors/${FixLinkText(actor.name)}`}>
                                <div className={styles["movie-actors__image"]}>
                                    <Image
                                        src={actor.profile_path ? `${IMAGE_BASE_URL}${actor.profile_path}` : "/images/backup-bg.png"}
                                        alt={actor.name}
                                        width={100}
                                        height={100}
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
                cast.length > 8 && (
                    <button 
                        type="button"
                        className={`${styles["show-more"]} text-preset-5`}
                        aria-label={toggleShowAll === 8 ? "Show more" : "Show less"}
                        onClick={handleToggle}
                    >
                        { allCast > toggleShowAll ? "Show more actors" : "Show fewer" }
                    </button>
                )
            }

        </div>
    )
}

export default DetailActors