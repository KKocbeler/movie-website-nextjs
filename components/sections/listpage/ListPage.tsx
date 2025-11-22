import Card from "@/components/ui/Card";
import styles from "./ListPage.module.scss";
import Link from "next/link";
import ErrorPage from "@/components/ui/ErrorPage";
import { Movie } from "@/types/ListItem";
import Pagination from "@/components/ui/Pagination";

type Props = {
  type: "movie" | "tv";
  title: string;
  page: number
};

type TMDBResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

const ListPage = async ({ type, title, page }: Props) => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const res = await fetch(
        `https://api.themoviedb.org/3/${type}/popular?api_key=${apiKey}&language=en-US&page=${page}`,
        { cache: "no-store" }
    );

    const data: TMDBResponse<Movie> = await res.json();

    if (!data || !data.results) return <ErrorPage />;

    return (
        <section className={`${styles["list-page"]} container`}>
        <h1 className="text-preset-2">{title}</h1>
        <article className={styles["list-wrapper"]}>
            {data.results.map((item) => (
            <Link href={`/${type === "tv" ? "series" : "movies"}/${item.id}`} key={item.id}>
                <Card
                genre_ids={item.genre_ids}
                poster_path={item.poster_path}
                release_date={item.release_date}
                title={item.title}
                vote_average={item.vote_average}
                listItem_id={item.id}
                />
            </Link>
            ))}
        </article>
        <Pagination currentPage={page} totalPages={data.total_pages} />
        </section>
    );
};

export default ListPage;
