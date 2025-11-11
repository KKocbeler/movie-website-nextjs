import styles from "./Pagination.module.scss";

type Props = {
    currentPage: number;
    totalPages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({currentPage, totalPages, setPage}: Props) => {
    const pages = Array.from( {length: totalPages }, (_, i) => i + 1);

    return (
        <div className={styles["pagination"]}>
            <button
                className={styles["pagination-btn"]}
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Prev
            </button>

            {
                pages.slice(Math.max(currentPage -3, 0), Math.min(currentPage + 2, totalPages)).map((page) => (
                    <button
                        key={page}
                        className={`${styles["pagination-btn"]} ${page === currentPage ? styles["active"] : ""}`}
                        onClick={() => setPage(page)}
                    >
                        {page}
                    </button>
                ))
            }

            <button
                className={styles["pagination-btn"]}
                onClick={() => setPage(currentPage + 1)}
                disabled={totalPages === currentPage}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination