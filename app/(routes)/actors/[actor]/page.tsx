"use client"

import Image from "next/image";
import styles from "./actor.module.scss";
import Card from "@/components/ui/Card";
import CardSkeleton from "@/components/ui/CardSkeleton";
import { useEffect, useState } from "react";
import { Actor, Cast } from "@/types/ActorTypes";
import { GetGenderLabel } from "@/components/utils/GetGenderLabel";
import Pagination from "@/components/ui/Pagination";

const ActorsPage = () => {
    const [actor, setActor] = useState<Actor | null>(null);
    const [cast, setCast] = useState<Cast[] | null>(null);
    const [page, setPage] = useState(1);
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    // pagination
    const moviePerPage = 20;
    const totalPages = Math.max(1, Math.ceil((cast?.length || 0)) / moviePerPage);
    const paginatedCast = cast?.slice((page - 1) * moviePerPage, page * moviePerPage)

    useEffect(() => {
    async function getActor() {
        try {
        const res1 = await fetch(
            `https://api.themoviedb.org/3/search/person?query=viggo%20mortensen&api_key=${apiKey}`
        );

        if (!res1.ok) throw new Error("API hatalı");
        const data1 = await res1.json();

        const actorId = data1.results[0]?.id;
        if (!actorId) throw new Error("Oyuncu bulunamadı");

        const [res2, res3] = await Promise.all([
            fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=${apiKey}`),
            fetch(`https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${apiKey}`)
        ]);

        if (!res2.ok) throw new Error("Res 2 error");
        if (!res3.ok) throw new Error("Res 3 error");

        const [data2, data3] = await Promise.all([res2.json(), res3.json()]);

        setActor(data2);
        setCast(data3.cast);
        } catch (error) {
        console.log("error message", error);
        }
    }

    getActor();
    }, []);

    return (
        <div className={`${styles["actor-page"]} container`}>
            <article className={styles["actor"]}>
                <figure className={styles["actor__image"]}>
                    <Image src={`${IMAGE_BASE_URL}/${actor?.profile_path}`} alt={`${actor?.name}'s photograph`} width={500} height={500}/>
                    <figcaption className="sr-only">{actor?.name}</figcaption>
                </figure>
                <div className={styles["actor__info"]}>
                    <h1 className="title">{actor?.name}</h1>
                    <section className={styles["personal__info"]}>
                        <h2>Personal Info</h2>
                        <ul className={styles["actor__details"]}>
                            <li className={styles["actor__detail"]}>
                                <strong className={styles["actor__label"]}>Born:</strong>{" "}
                                {actor?.birthday || "—"}
                            </li>

                            <li className={styles["actor__detail"]}>
                                <strong className={styles["actor__label"]}>Birthplace:</strong>{" "}
                                {actor?.place_of_birth || "—"}
                            </li>

                            <li className={styles["actor__detail"]}>
                                <strong className={styles["actor__label"]}>Gender:</strong>{" "}
                                {GetGenderLabel(actor?.gender)}
                            </li>

                            <li className={styles["actor__detail"]}>
                                <strong className={styles["actor__label"]}>Popularity:</strong>{" "}
                                {actor?.popularity ? actor.popularity.toFixed(1) : "—"}
                            </li>

                            <li className={styles["actor__detail"]}>
                                <strong className={styles["actor__label"]}>Department:</strong>{" "}
                                {actor?.known_for_department || "—"}
                            </li>
                        </ul>
                    </section>
                    <section className={styles["biography"]}>
                        <h2 className="title">Biography</h2>
                        <p>{actor?.biography || "-"}</p>
                    </section>
                </div>
                <section className={styles["filmography"]}>
                    <h2 className="title">Filmography</h2>
                    <div className={styles["movies"]}>
                        {
                            paginatedCast?.map((movie) => (
                                <div key={movie.id}>
                                    {paginatedCast 
                                    ?   <Card 
                                            title={movie.title} 
                                            release_date={movie.release_date} 
                                            genre_ids={movie.genre_ids} 
                                            vote_average={movie.vote_average}
                                            poster_path={movie.poster_path}
                                            movie_id={movie.id}
                                        />
                                    :   <CardSkeleton />
                                    }
                                </div>
                            ))
                        }
                        
                    </div>
                    <Pagination currentPage={page} setPage={setPage} totalPages={totalPages}/>
                </section>
            </article>
        </div>
    )
}

export default ActorsPage