import Image from "next/image";
import styles from "./ErrorPage.module.scss";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <main className={`${styles["error"]} container`} role="alert" aria-live="assertive">
        <div className={styles["error__wrapper"]}>
            <Image src={"/images/error.png"} width={500} height={500} alt="error page image" priority></Image>
            <h1 className={styles["error__title"]}>Something went wrong</h1>
            <p className={`${styles["error__message"]} text-preset-5`}>
                Oops — an unexpected error happened. We've logged this issue. You can try again or go back
                to the <Link href={"/"}>homepage.</Link>
            </p>
        </div>
    </main>
  )
}

export default ErrorPage