import Link from "next/link";
import styles from "./Pagination.module.scss";

type Props = {
  currentPage: number;
  totalPages: number;
};

const Pagination = ({ currentPage, totalPages }: Props) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles["pagination"]}>
      {totalPages > 1 && (
        currentPage === 1 ? (
          <span className={`${styles["pagination-btn"]} ${styles["disabled"]}`}>Prev</span>
        ) : (
          <Link
            href={`?page=${currentPage - 1}`}
            className={styles["pagination-btn"]}
          >
            Prev
          </Link>
        )
      )}
      {pages
        .slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, totalPages))
        .map((page) => (
          <Link
            href={`?page=${page}`}
            key={page}
            className={`${styles["pagination-btn"]} ${page === currentPage ? styles["active"] : ""}`}
          >
            {page}
          </Link>
        ))}
      {totalPages > 1 && (
        currentPage === totalPages ? (
          <span className={`${styles["pagination-btn"]} ${styles["disabled"]}`}>Next</span>
        ) : (
          <Link
            href={`?page=${currentPage + 1}`}
            className={styles["pagination-btn"]}
          >
            Next
          </Link>
        )
      )}
    </div>
  );
};

export default Pagination;
