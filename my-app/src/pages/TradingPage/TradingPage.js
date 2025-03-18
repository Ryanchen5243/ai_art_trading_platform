import {React, useState, useEffect} from 'react';
import {all, default as axios} from "axios";
import styles from "./TradingPage.module.css";
import SettingsComp from "../../components/SettingsComp.js"
import GainerLoserItem from '../../components/GainerLoserItem.js';
const TradingPage = () => {
  const [isSettingsOpen,setIsSettingsOpen] = useState(false);
  const [gainerData,setGainerData] = useState([]);
  const [gainerLoading,setGainerLoading] = useState(true);
  const openSettings = () => {setIsSettingsOpen(true)};
  const closeSettings = () => {setIsSettingsOpen(false)};

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setGainerLoading(true);
        await axios.get('http://localhost:5000/fetchTopStocks').then(
          (res) => {
            setGainerData(res.data);
            console.log(res.data)
          }
      )} catch (err) {
        console.log(err);
      } finally {
        setGainerLoading(false);
      }
    }
    fetchStocks();
    const intervalId = setInterval(fetchStocks,1500);
    return () => clearInterval(intervalId);
  },[]);

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
            <ul className={styles.gainer_loser_styles}>
              {gainerData.map((data) => <GainerLoserItem key={data.name.toString()} data={data} styles={styles}/>)}
            </ul>
          </div>
          <div className={styles.panel}>Watchlist</div>
        </aside>
        <section className={styles.content}>
          <h1>charts go here..</h1>
          <ul>
              
          </ul>
        </section>
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
