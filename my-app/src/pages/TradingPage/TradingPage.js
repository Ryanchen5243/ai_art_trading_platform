import {React, useState} from 'react';
import styles from "./TradingPage.module.css";
import SettingsComp from "../../components/SettingsComp.js"
import TopStocks from '../../components/TopStocks.js';
const TradingPage = () => {
  const [isSettingsOpen,setIsSettingsOpen] = useState(false);
  const openSettings = () => {setIsSettingsOpen(true)};
  const closeSettings = () => {setIsSettingsOpen(false)};

  return (
    <div className={styles.container}>
      <header className={styles.tradingPageHeader}>
        <p>header</p>
        <button onClick={openSettings}>
          settings
        </button>
        
        {isSettingsOpen && (
          <div className={styles.settingsBackdropStyles}>
          <div className={styles.settingsStyles}>
            <SettingsComp closeSettings={closeSettings}/>
          </div>
        </div>
        )}
      </header>
      <div className={styles.main}>
        <aside className={`${styles.sidebar} ${styles.left}`}>
          <div className={styles.panel}>
            <TopStocks />
          </div>
          <div className={styles.panel}>Watchlist</div>
        </aside>
        <section className={styles.content}>Charts go here...</section>
        <aside className={`${styles.sidebar} ${styles.right}`}>
          <div className={styles.panel}>My Account</div>
          <div className={styles.panel}>Current Positions</div>
        </aside>
      </div>
      <footer className={styles.footer}>Footer</footer>
    </div>
  );
};

export default TradingPage;
