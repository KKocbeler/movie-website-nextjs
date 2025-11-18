import styles from "./NavbarAuthor.module.scss";
import Link from 'next/link'

const NavbarAuthor = () => {
    return (
        <>
        <div className={styles["author"]}>
            <Link 
                href={"/author/login"}
                className={`${styles["login"]} text-preset-5`}
            >
                Login
            </Link>
            <Link 
                href={"/author/register"}
                className={`${styles["sign-up"]} text-preset-5`}
            >
                Sign Up
            </Link>
        </div>
        </>

    )
}

export default NavbarAuthor