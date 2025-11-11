import styles from "./Genre.module.scss";

type PropType = {
    text: string
}

const Genre = ({text}: PropType) => {
  return (
    <span className={`${styles.genre} text-preset-6`}>
        {text}
    </span>
  )
}

export default Genre