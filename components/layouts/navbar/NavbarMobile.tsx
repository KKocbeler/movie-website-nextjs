"use client"

import Link from "next/link";
import { navList } from "./Navbar";
import styles from "./NavbarMobile.module.scss";
import { usePathname } from "next/navigation";

const NavbarMobile = () => {
    const pathname = usePathname();

  return (
        <div className={styles["mobile-navbar"]}>
                <ul className={styles["mobile-navbar__list"]}>
                    {navList.map((navItem) => (
                        <li key={navItem.path} className={styles["mobile-navbar__list-item"]}>
                            <Link href={navItem.path} className={pathname === navItem.path ? styles["active"] : ""}>
                                {navItem.icon}
                                <p>{navItem.label}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
        </div>
  )
}

export default NavbarMobile