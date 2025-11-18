"use client"

import Link from 'next/link'
import styles from "./Navbar.module.scss"
import { FaFacebookF, FaInstagram, FaMessage, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { IoMdMoon } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MdLocalMovies, MdSunny } from 'react-icons/md';
import Image from 'next/image';
import NavbarAuthor from './NavbarAuthor';
import NavbarSearch from './NavbarSearch';
import NavbarMobile from './NavbarMobile';
import { FaHome } from 'react-icons/fa';
import { RiMovie2Fill } from 'react-icons/ri';


export const navList = [
    {
        label: "Home",
        path: "/",
        icon: <FaHome />
    },
    {
        label: "Movies",
        path: "/movies",
        icon: <MdLocalMovies />
    },
        {
        label: "Series",
        path: "/series",
        icon: <RiMovie2Fill />
    },
    {
        label: "Contact",
        path: "/contact",
        icon: <FaMessage />
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

const Navbar = () => {
    const [darkMode, setDarkMode] = useState<boolean | null>();

    useEffect(() => {
        const savedTheme = localStorage.getItem("Theme");

        if(savedTheme !== null) {
            setDarkMode(JSON.parse(savedTheme))
        }
    }, [])

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle("dark", darkMode ? darkMode : false);
    }, [darkMode]);

    const handleTheme = () => {
        setDarkMode(!darkMode);
        localStorage.setItem("Theme", JSON.stringify(!darkMode));
    }

    return (
        <>
        <nav className={`${styles.navbar} container`}>
            <div className={styles["nav-logo"]}>
                <Link href={"/"}>
                    <Image src={"/images/logo.png"} alt='Movie logo' width={80} height={80}></Image>
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
            <NavbarAuthor />
            <button 
                className={styles["theme-button"]}
                type='button'
                onClick={handleTheme}
                aria-label='Theme'
            >
                {
                    darkMode ? (
                        <MdSunny />
                    ) : (
                        <IoMdMoon />
                    )
                }
            </button>
            <NavbarMobile />
        </nav>
        <NavbarSearch />
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
