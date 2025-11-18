"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export const usePagination = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const pageParam = searchParams.get("page") || "1";
    const [page, setPage] = useState(Number(pageParam));

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        router.push(`?page=${newPage}`, { scroll: false });
    }

    useEffect(() => {
        setPage(Number(pageParam));
    }, [pageParam])

    return { page, handlePageChange };
}