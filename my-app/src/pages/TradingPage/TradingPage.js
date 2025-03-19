import { React, useState, useEffect, useRef } from 'react';
import { Search } from "lucide-react";
import { all, default as axios } from "axios";
import styles from "./TradingPage.module.css";
import SettingsComp from "../../components/SettingsComp.js";
import GainerLoserItem from '../../components/GainerLoserItem.js';
import StockDisplayChart from './StockDisplayChart.js';

const TradingPage = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [gainerData, setGainerData] = useState([]);
  const [gainerLoading, setGainerLoading] = useState(true);
  const [stockDropDownList,setStockDropDownList] = useState([]);
  const [query, setQuery] = useState(""); // Move the query state here
  const [showStocks, setShowStocks] = useState(false); // Move the showStocks state here

  const [displayStock,setDisplayStock] = useState('FRY-99');

  const openSettings = () => { setIsSettingsOpen(true); };
  const closeSettings = () => { setIsSettingsOpen(false); };

  const searchBarRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      console.log("Searching for:", query); // Replace with actual search logic
      setShowStocks(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowStocks(false);  // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setGainerLoading(true);
        await axios.get('http://localhost:5000/fetchTopStocks').then(
          (res) => {
            setGainerData(res.data);
          }
        );
      } catch (err) {
        console.log(err);
      } finally {
        setGainerLoading(false);
      }
    };

    fetchStocks();
    const intervalId = setInterval(fetchStocks, 1500);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchAllStocks = async () => {
      try {
        await axios.get("http://localhost:5000/fetchStockData").then(
          (res) => {
            setStockDropDownList(res.data);
          }
        )
      } catch(err){
        console.log(err)
      }
    };
    fetchAllStocks();
  },[]);

  return (
    <div className={styles.container}>
      <header className={styles.tradingPageHeader}>
      <div ref={searchBarRef} className={styles.searchBarContainer}>
        <div className={styles.searchBar} onClick={() => setShowStocks(true)}>
          <Search className={styles.searchIcon} size={20} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
        {showStocks && (
          <div ref={dropdownRef} className={styles.stockDropdown}>
            <ul>
              {stockDropDownList.filter(stock => stock.name.toLowerCase().includes(query.toLowerCase()))
                .map((stock, index) => (
                  <li key={index} className={styles.stockItem} onClick={() => { setQuery(stock.name); setDisplayStock(stock.ticker); setShowStocks(false); }}>
                    {stock.name}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      <button onClick={openSettings}>
          settings
        </button>
        {isSettingsOpen && (
          <div className={styles.settingsBackdropStyles}>
            <div className={styles.settingsStyles}>
              <SettingsComp closeSettings={closeSettings} />
            </div>
          </div>
        )}
      </header>

      <div className={styles.main}>
        <aside className={`${styles.sidebar} ${styles.left}`}>
          <div className={styles.panel}>
            <ul className={styles.gainer_loser_styles}>
              {gainerData.map((data) => <GainerLoserItem key={data.name.toString()} data={data} styles={styles} />)}
            </ul>
          </div>
          <div className={styles.panel}>Watchlist</div>
        </aside>

        <section className={styles.content}>
          <h1>charts go here..</h1>
          <h2>the selected stock is ... {displayStock}</h2>
          {/* <StockDisplayChart />  */}
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
