import styles from "./index.module.css";

const DetailsSubtitle = ({ text }: { text: string }) => {
  return (
    <>
      <div className={styles.line}></div>
      <h2 className={styles.subtitle} aria-label={text}>
        {text}
      </h2>
      <div className={styles.line}></div>
    </>
  );
};

export default DetailsSubtitle;
