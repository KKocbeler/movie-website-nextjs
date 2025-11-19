"use client"

import { useEffect, useState } from "react";
import styles from "./NavbarSearch.module.scss";
import { useSearchStore } from "@/store/SearchStore";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";

const NavbarSearch = () => {
    const [IsBackdropOpen, setIsBackdropOpen] = useState(false);
    const {searchType, allTypes, setSearchType} = useSearchStore();
    const [keyword, setKeyword] = useState("");
    const router = useRouter();

    useEffect(() => {
        const savedType = localStorage.getItem("savedType");

        if (savedType) {
            setSearchType(savedType);
        } else {
            setSearchType("All");
        }
    }, []);



    const handleBackdrop = (type: string) => {
        setSearchType(type);
        setIsBackdropOpen(false);
        localStorage.setItem("savedType", type)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(keyword.trim() === "") return;
        router.push(`/search/${keyword}`)
    }

    return (
        <div className={`${styles["nav-search"]} container`}>
            <div className={styles["media-section"]}>
                <button
                    type='button'
                    className={styles["media-button"]}
                    onClick={() => setIsBackdropOpen(!IsBackdropOpen)}
                >
                    {searchType ? searchType : "-"}
                    <IoIosArrowDown />
                </button>
                <ul className={`${styles["backdrop-list"]} ${IsBackdropOpen ? styles.show : ""}`}>
                    {
                        allTypes.filter((type) => type !== searchType).map((media_type) => (
                            <li 
                                className={styles["backdrop-list-item"]}
                                key={media_type}
                                onClick={() => handleBackdrop(media_type)}
                            >
                                <button
                                    type='button'
                                    aria-label={media_type}
                                >{media_type}</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={styles["input-box"]}>
                    <input 
                        type="text" 
                        placeholder="Search for a movie or serie"
                        value={keyword} onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button
                        type='submit'
                        className={styles.search}
                        aria-label='Search'
                    >
                        <CiSearch />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NavbarSearch