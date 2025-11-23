"use client"

import Image from "next/image";
import styles from "./ActorPage.module.scss";
import Card from "@/components/ui/Card";
import CardSkeleton from "@/components/ui/CardSkeleton";
import { useEffect, useMemo, useState } from "react";
import { Actor, Cast } from "@/types/ActorTypes";
import { GetGenderLabel } from "@/components/utils/GetGenderLabel";
import Pagination from "@/components/ui/Pagination";
import { FixLinkText } from "@/components/utils/FixLinkText";
import Link from "next/link";
import { IMAGE_BASE_URL } from "@/constants/tmdb";
import TextSkeleton from "@/components/ui/TextSkeleton";
import ErrorPage from "@/components/ui/ErrorPage";
import { usePagination } from "@/hooks/usePagination";
import { LineBreaker } from "@/components/utils/LineBreaker";
import { DateGenerator } from "@/components/utils/DateGenerator";

type Props = {
    name: string;
}

const ActorPage = ({name}: Props) => {
    const { page } = usePagination();
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const [actor, setActor] = useState<Actor | null>(null);
    const [cast, setCast] = useState<Cast[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showAll, setShowAll] = useState(false)


    const moviePerPage = 20;
    const totalPages = useMemo(() => Math.max(1, Math.ceil((cast?.length || 0) / moviePerPage)),[cast?.length]);
    const paginatedCast = cast?.slice((page - 1) * moviePerPage, page * moviePerPage);

    useEffect(() => {
        async function getActor() {
            setLoading(true);
            try {
                const res1 = await fetch(
                    `https://api.themoviedb.org/3/search/person?query=${FixLinkText(name)}&api_key=${apiKey}`
                );

                if (!res1.ok) throw new Error("Can't find actor");
                const data1 = await res1.json();
                const actorId = data1.results[0]?.id;

                if (!actorId) throw new Error("Actor not found");

                const [res2, res3] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=${apiKey}`),
                    fetch(`https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${apiKey}`)
                ]);

                if (!res2.ok || !res3.ok) throw new Error("Can't fetch actor details");

                const [data2, data3] = await Promise.all([res2.json(), res3.json()]);

                setActor(data2);
                setCast(data3.cast);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }

        getActor();
    }, [name]);

    if(error) return <ErrorPage />

    return (
        <div className={`${styles["actor-page"]} container`}>
            <article className={styles["actor"]}>
                <figure className={styles["actor__image"]}>
                    {
                        loading ? (
                            <CardSkeleton />
                        ) : (
                            <>
                                <Image src={`${IMAGE_BASE_URL}/${actor?.profile_path}`} alt={`${actor?.name}'s photograph`} width={320} height={400}/>
                                <figcaption className="sr-only">{actor?.name}</figcaption>
                            </>
                        )
                    }

                </figure>
                <div className={styles["actor__info"]}>
                    <h1 className="title">{actor?.name}</h1>
                    <section className={styles["personal__info"]}>
                        <h2>Personal Info</h2>
                        <ul className={styles["actor__details"]}>
                            <li><strong>Born:</strong> {loading ? <TextSkeleton width="60%" /> : DateGenerator(actor?.birthday) || "—"}</li>
                            <li><strong>Birthplace:</strong> {loading ? <TextSkeleton width="70%" /> : actor?.place_of_birth || "—"}</li>
                            <li><strong>Gender:</strong> {loading ? <TextSkeleton width="30%" /> : GetGenderLabel(actor?.gender)}</li>
                            <li><strong>Popularity:</strong> {loading ? <TextSkeleton width="20%" /> : actor?.popularity?.toFixed(1) || "—"}</li>
                            <li><strong>Department:</strong> {loading ? <TextSkeleton width="50%" /> : actor?.known_for_department || "—"}</li>
                        </ul>
                    </section>
                    <section className={styles["biography"]}>
                        <h2 className="title">Biography</h2>
                        {
                            loading ? (
                                <TextSkeleton width="100%"/>
                            ) : (
                         
                                <p className={styles["biography-text"]} onClick={() => setShowAll(!showAll)}>{LineBreaker(actor?.biography || "-", showAll ? 999999 : 500)}</p>
                            )
                        }
                        
                    </section>
                </div>
                <section className={styles["filmography"]}>
                    <h2 className="title">Filmography</h2>
                    {
                        loading ? (
                            <div className={styles["movies"]}>
                                {Array.from({ length: 10 }).map((_, i) => <CardSkeleton key={i} />)}
                            </div>
                        ) : (
                            <div className={styles["movies"]}>
                                {
                                    paginatedCast?.map((movie) => (
                                        <Link href={`/movies/${movie.id}`} key={movie.id}>
                                            <Card 
                                                title={movie.title} 
                                                release_date={movie.release_date} 
                                                genre_ids={movie.genre_ids} 
                                                vote_average={movie.vote_average}
                                                poster_path={movie.poster_path}
                                                listItem_id={movie.id}
                                            />
                                        </Link>
                                    ))
                                }
                            </div>
                        )
                    }

                    <Pagination currentPage={page} totalPages={totalPages}/>
                </section>
            </article>
        </div>
    )
}

export default ActorPage