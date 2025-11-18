"use client"

import { useEffect, useState } from "react"
import Card from "@/components/ui/Card";
import styles from "./ListPage.module.scss";
import Pagination from "@/components/ui/Pagination";
import CardSkeleton from "@/components/ui/CardSkeleton";
import { Movie, Serie } from "@/types/ListItem";
import Link from "next/link";
import ErrorPage from "@/components/ui/ErrorPage";
import { usePagination } from "@/hooks/usePagination";

type Props = {
    type: "movie" | "tv";
    title: string;
}

const ListPage = ({type, title}: Props) => {
    const { page, handlePageChange } = usePagination();
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const [list, setList] = useState<Movie[] | Serie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        async function getList () {
            setLoading(true)
            try {
                const response = await fetch(`https://api.themoviedb.org/3/${type}/popular?api_key=${apiKey}&language=en-US&page=${page}`)

                if(!response.ok) throw new Error("Fetch failed");

                const data = await response.json();

                setList(data.results);

                console.log(data)
            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }
        }

        getList()
    }, [page, type])

    if(error) return <ErrorPage />

    return (
        <section className={`${styles["list-page"]} container`}>
            <h1 className="text-preset-2">{title}</h1>
            <article className={styles["list-wrapper"]}>
                {
                    loading ? (
                        Array.from({ length: 10}).map((_, i) => (
                            <CardSkeleton key={i}/>
                        ))
                    ) : (
                        list.map((listItem) => {
                            const itemTitle = "title" in listItem ? listItem.title : listItem.name;
                            const releaseDate = "release_date" in listItem ? listItem.release_date : listItem.first_air_date;
                            return (
                                <Link 
                                    href={`/${type === "movie" ? "movies" : "series"}/${listItem.id}`}
                                    key={listItem.id}
                                >
                                    <Card
                                        key={listItem.id}
                                        genre_ids={listItem.genre_ids}
                                        poster_path={listItem.poster_path}
                                        release_date={releaseDate}
                                        title={itemTitle}
                                        vote_average={listItem.vote_average}
                                        listItem_id= {listItem.id}
                                    />
                                </Link>
                        )})
                    )
                }
            </article>
            <Pagination 
                currentPage={page} 
                totalPages={20}  
                setPage={handlePageChange}
            />
        </section>
    )
}

export default ListPage