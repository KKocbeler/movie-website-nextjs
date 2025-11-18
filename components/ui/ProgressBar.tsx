"use client";

import { useEffect, useState } from "react";
import styles from "./ProgressBar.module.scss";

type Props = {
  value: number;
};

const ProgressBar = ({ value }: Props) => {
  const [offset, setOffset] = useState(440);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max(value * 10, 0), 100);

  useEffect(() => {
    const progressOffset = circumference - (percentage / 100) * circumference;
    setOffset(progressOffset);
  }, [percentage, circumference]);

  return (
    <div className={styles["progress-bar"]}>
      <svg
        className={styles["svg"]}
        viewBox="0 0 160 160"
      >
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stopColor="hsl(199, 74%, 40%)" />
            <stop offset="100%" stopColor="hsl(199, 74%, 40%)" />
          </linearGradient>
        </defs>

        <circle className={styles["circle-bg"]} cx="80" cy="80" r={radius} />
        <circle
            className={styles["circle-progress"]}
            cx="80"
            cy="80"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
        />
      </svg>
      <div className={styles["rate"]}>{value?.toFixed(1)}</div>
    </div>
  );
};

export default ProgressBar;
