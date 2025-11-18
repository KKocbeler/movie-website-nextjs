import Link from "next/link";
import styles from "./BackToHome.module.scss";
import Image from "next/image";

const BackToHome = () => {
  return (
    <Link className={styles["back-to-home"]} href="/">
        <Image src={"/images/logo.png"} alt="Movie's logo" width={80} height={80}/>
    </Link>
  )
}

export default BackToHome