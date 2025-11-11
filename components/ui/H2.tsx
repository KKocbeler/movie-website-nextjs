import styles from "./H2.module.scss";

type PropsType = {
    text: string;
}

const H2 = ({text}: PropsType) => {
  return (
    <h2 className={`${styles.title} text-preset-4`}>
        {text}
    </h2>
  )
}

export default H2