"use client"

import { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'
import styles from "./BackToTop.module.scss"

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        };
    }, []);

return (
    <button 
        className={`${styles["back-to-top"]} ${isVisible ? styles.visible : ""}`}
        type='button'
        onClick={() => scrollToTop()}
    >
        <FaArrowUp />
    </button>
)
}

export default BackToTop