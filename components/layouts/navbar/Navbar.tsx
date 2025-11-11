"use client"
import Link from 'next/link'
import { CiSearch } from 'react-icons/ci'
import styles from "./Navbar.module.scss"
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';

const navList = [
    {
        label: "Home",
        path: "/",
    },
    {
        label: "Movies",
        path: "/movies",
    },
        {
        label: "Series",
        path: "/series",
    },
    {
        label: "Contact",
        path: "/contact",
    },
];

const socialLinks = [
  {
    label: "Facebook",
    path: "https://www.facebook.com/",
    icon: <FaFacebookF />,
  },
  {
    label: "Instagram",
    path: "https://www.instagram.com/",
    icon: <FaInstagram />,
  },
  {
    label: "YouTube",
    path: "https://www.youtube.com/",
    icon: <FaYoutube />,
  },
  {
    label: "Twitter",
    path: "https://twitter.com/",
    icon: <FaXTwitter />,
  },
];

const genres = ["All", "Horor", "Thriller", "Animation", "Adventure", "Action"]

const Navbar = () => {
    const [currentGenre, setCurrentGenre] = useState(genres[0]);
    const [IsBackdropOpen, setIsBackdropOpen] = useState(false);

    const handleBackdrop = (genre: string) => {
        setCurrentGenre(genre);
        setIsBackdropOpen(false);
    }

    return (
        <>
        <nav className={`${styles.navbar} container`}>
            <div className={styles["nav-logo"]}>
                <Link href={"/"}>
                    <h1 className='text-preset-1'>MOVIE</h1>
                </Link>
            </div>
            <div className={styles["nav-menu"]}>
                <ul className={styles["nav-menu__list"]}>
                    {
                        navList.map((item) => (
                            <li className={styles["nav-menu__list-item"]} key={item.label}>
                                <Link
                                    className='text-preset-5'
                                    href={item.path}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))
                    }

                </ul>
            </div>
            <div className={styles["author"]}>
                <Link 
                    href={"/"}
                    className={`${styles["login"]} text-preset-5`}
                >
                    Login
                </Link>
                <Link 
                    href={"/"}
                    className={`${styles["sign-up"]} text-preset-5`}
                >
                    Sign Up
                </Link>
            </div>
            <div className={styles["hamburger-menu"]}>
                <button
                    type='button'
                    className={styles["hamburger-menu__icon"]}
                >
                    <RxHamburgerMenu />
                    <span className='sr-only'>Menu</span>
                </button>
            </div>
        </nav>
        <div className={`${styles["nav-search"]} container`}>
            <form action="">
                <div className={styles["input-box"]}>
                    <div className={styles["genre-section"]}>
                        <button
                            type='button'
                            className={styles["genre-button"]}
                            onClick={() => setIsBackdropOpen(!IsBackdropOpen)}
                        >
                            {currentGenre}
                            <IoIosArrowDown />
                        </button>
                        <ul className={`${styles["backdrop-list"]} ${IsBackdropOpen ? styles.show : ""}`}>
                            {
                                genres.filter((genre) => genre !== currentGenre).map((genre) => (
                                    <li 
                                        className={styles["backdrop-list-item"]}
                                        key={genre}
                                        onClick={() => handleBackdrop(genre)}
                                    >
                                        {genre}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <input type="text" placeholder='Search for a movie'/>
                    <button
                        type='submit'
                        className={styles.search}
                    >
                        <CiSearch />
                    </button>
                </div>
            </form>
        </div>
        <div className={`${styles["social"]} container`}>
            <p className='text-preset-6'>FOLLOW US</p>
            <ul className={styles["social__list"]}>
                    {
                        socialLinks.map((socialLink) => (
                            <li className={styles["social__list-item"]} key={socialLink.label}>
                                <a 
                                    href={socialLink.path}
                                    aria-label={socialLink.label}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    {socialLink.icon}
                                    <span className='sr-only'>{socialLink.label}</span>
                                </a>
                            </li>
                        ))
                    }
            </ul>
        </div>
        </> 
    )
}

export default Navbar
