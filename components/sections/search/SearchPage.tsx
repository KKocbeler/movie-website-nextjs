"use client"

import styles from "./SearchPage.module.scss";
import Card from '@/components/ui/Card';
import CardSkeleton from '@/components/ui/CardSkeleton';
import ErrorPage from "@/components/ui/ErrorPage";
import Pagination from "@/components/ui/Pagination";
import { FixLinkText } from '@/components/utils/FixLinkText';
import { usePagination } from "@/hooks/usePagination";
import { useSearchStore } from '@/store/SearchStore';
import { Movie, Serie } from "@/types/ListItem";
import Link from "next/link";
import { useEffect, useState } from 'react'


type Props = {
    query : string;
}

const SearchPage = ({query }: Props) => {
    const { page, handlePageChange} = usePagination()
    const { searchType } = useSearchStore();
    const [found, setFound] = useState<Movie[] | Serie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [totalPage, setTotalPage] = useState<number>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const type =
                    searchType === "Movies"
                    ? "movie"
                    : searchType === "TV Series"
                    ? "tv"
                    : "multi";

                const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                const res = await fetch(
                     `https://api.themoviedb.org/3/search/${type}?api_key=${apiKey}&query=${FixLinkText(query)}&page=${page}`
                );
                if (!res.ok) throw new Error("Fetch failed.");

                const data = await res.json();
                setFound(data.results);
                setTotalPage(data.total_pages);
            } catch (error) {
                setError((error as Error).message)
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, [searchType, query, page]);

    if(error) return <ErrorPage />

    return (
        <section className={styles["search"]}>
            <h1 className="title text-preset-2">Arama Sonucu</h1>
            <article className={styles["search__wrapper"]}>
                {loading ? (
                    Array.from({ length: 10 }).map((_, i) => (
                        <section className={styles["search__card"]} key={i}>
                            <CardSkeleton />
                        </section>
                    ))
                ) : (
                    found &&
                    found
                    .filter((item) => item.poster_path)
                    .map((item) => {
                            const itemTitle = "title" in item ? item.title : item.name;
                            const releaseDate = "release_date" in item ? item.release_date : item.first_air_date;
                            const link = "first_air_date" in item ? "series" : "movies"
                        return (
                            <section className={styles["search__card"]} key={item.id}>
                                <Link href={`/${link}/${item.id}`}>
                                    <Card
                                        genre_ids={item.genre_ids}
                                        listItem_id={item.id}
                                        poster_path={item.poster_path}
                                        release_date={releaseDate}
                                        title={itemTitle}
                                        vote_average={item.vote_average}
                                    />
                                </Link>
                            </section>
                        )
                    })
                )}
            </article>
            <Pagination currentPage={page} setPage={handlePageChange} totalPages={totalPage || 1}/>
        </section>
    )
}

export default SearchPage