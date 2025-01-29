import React from 'react';
import styles from "./TradingPage.module.css";

const TradingPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>Header</header>
      <div className={styles.main}>
        <aside className={`${styles.sidebar} ${styles.left}`}>
          <div className={styles.panel}>Left Top</div>
          <div className={styles.panel}>Left Bottom</div>
        </aside>

        <section className={styles.content}>Middle</section>

        <aside className={`${styles.sidebar} ${styles.right}`}>
          <div className={styles.panel}>Right Top</div>
          <div className={styles.panel}>Right Bottom</div>
        </aside>
      </div>
      <footer className={styles.footer}>Footer</footer>
    </div>
  );
};

export default TradingPage;
