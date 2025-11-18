import styles from "./TextSkeleton.module.scss";

const TextSkeleton = ({ width = "100%" }) => {
  return (
    <div className={styles["text-skeleton"]} style={{width}}></div>
  );
};

export default TextSkeleton;