import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import styles from "./Footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import BackToTop from "@/components/common/BackToTop";

const socialLinks = [
  {
    label: "Facebook",
    path: "https://facebook.com/yourUsername",
    icon: <FaFacebookF />
  },
  {
    label: "Twitter",
    path: "https://twitter.com/yourUsername",
    icon: <FaTwitter />
  },
  {
    label: "Instagram",
    path: "https://instagram.com/yourUsername",
    icon: <FaInstagram />
  },
  {
    label: "YouTube",
    path: "https://youtube.com/yourChannel",
    icon: <FaYoutube />
  }
];

const Footer = () => {
  return (
        <footer id={styles.footer}>        
            <div className={`${styles["footer-body"]} container`}>
                <div className={styles["footer-logo"]}>
                    <Link href={"/"}>
                        <Image src={"/images/logos.png"} alt='Movie logo' width={80} height={120}></Image>
                    </Link>
                </div>
                <div className={styles["subscribe"]}>
                    <p className='text-preset-6'>NOT QUITE READY FOR SAVVY?</p>
                    <p>Join our community for free. No spam ever.</p>
                    <form>
                        <label htmlFor="email" className="sr-only">Email Address</label>
                            <input id="email" type="email" placeholder='Enter your email' required/>
                            <button type='submit' className={styles["to-login"]} aria-label='subscribe'>
                                Subscribe
                            </button>
                    </form>
                </div>  
                <ul className={styles["social-list"]}>
                    {socialLinks.map((link) => (
                        <li className={styles["social-list__item"]} key={link.label} title={link.label}>
                            <a href={link.path}>
                                {link.icon} 
                                <span className="sr-only">{link.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
  )
}

export default Footer