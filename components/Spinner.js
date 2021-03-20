import styles from 'styles/spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.root}>
      <div className={styles.dot} />
      <div className={styles.dot} />
    </div>
  );
};

export default Spinner;
