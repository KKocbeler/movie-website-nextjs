"use client";

import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import styles from "./LoginPage.module.scss";
import Link from "next/link";
import { useState } from "react";
import BackToHome from "@/components/ui/BackToHome";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles["login"]}>
        <div className={styles["login__wrapper"]}>
            <h1 className="text-preset-2">Login</h1>
            <form>
            <div className={styles["input-box"]}>
                <input type="text" id="username" required />
                <label htmlFor="username" className="text-preset-6">
                    Username
                </label>
                <IoMdMail className={styles["icon"]} />
            </div>
            <div className={styles["input-box"]}>
                <input
                type={showPassword ? "text" : "password"}
                id="password"
                required
                />
                <label htmlFor="password" className="text-preset-6">
                    Password
                </label>
                <button
                type="button"
                className={styles["pass-btn"]}
                onClick={() => setShowPassword(!showPassword)}
                >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
            <div className={styles["check"]}>
                <div className={styles["check-box"]}>
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe" className="text-preset-6">
                    Remember me
                </label>
                </div>
                <a href="#" className="text-preset-6">
                    Forget Password?
                </a>
            </div>
            <button type="submit" className={styles["login__button"]}>
                Login
            </button>
            <p className="text-preset-6">
                Don't have an account?{" "}
                <Link href="/author/register">Register</Link>
            </p>
            </form>
        </div>
        <BackToHome />
    </div>
  );
};

export default LoginPage;
