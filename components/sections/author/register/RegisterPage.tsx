import { IoMdMail } from "react-icons/io";
import { FaUser, FaLock } from "react-icons/fa6";
import Link from "next/link";
import styles from "./RegisterPage.module.scss";
import BackToHome from "@/components/ui/BackToHome";

const RegisterPage = () => {

    return (
        <div className={styles["register"]}>
            <div className={styles["register__wrapper"]}>
                <h1 className="text-preset-2">Create Account</h1>
                <form>
                    <div className={styles["input-box"]}>
                        <input type="text" id="username" required />
                        <label htmlFor="username" className="text-preset-6">Username</label>
                        <FaUser />
                    </div>

                    <div className={styles["input-box"]}>
                        <input type="email" id="email" required />
                        <label htmlFor="email" className="text-preset-6">Email</label>
                        <IoMdMail />
                    </div>
                    <div className={styles["input-box"]}>
                        <input 
                            type="password"
                            id="password" 
                            required 
                        />
                        <label htmlFor="password" className="text-preset-6">Password</label>
                        <FaLock />
                    </div>
                    <div className={styles["input-box"]}>
                        <input 
                            type="password"
                            id="password2" 
                            required 
                        />
                        <label htmlFor="password2" className="text-preset-6">Confirm Password</label>
                        <FaLock />
                    </div>
                    <button 
                        type="submit"
                        className={styles["register__button"]}
                    >
                        Register
                    </button>
                    <p className="text-preset-6">
                        Already have an account? <Link href="/author/login">Login</Link>
                    </p>
                </form>
            </div>
            <BackToHome />
        </div>
    );
};

export default RegisterPage;
