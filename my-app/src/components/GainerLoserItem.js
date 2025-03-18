import React from 'react';
import styles from './GainerLoserItem.module.css';

function GainerLoserItem(props) {
  const { ticker, name, curr_stock_price, change, market_cap, volume } = props.data;
  const changeStyle = change >= 0 ? styles.gain : styles.loss;
  const arrowIcon = change >= 0 ? '↑' : '↓';

  return (
    <li className={styles.gainerLoserItem}>
      <div className={styles.stockHeader}>
        <span className={styles.tickerName}>
          <strong>{ticker}</strong>
        </span>
        <span className={styles.price}>{curr_stock_price}</span>
      </div>

      <div className={styles.changeWrapper}>
        <span className={`${styles.change} ${changeStyle}`}>{arrowIcon} {change}%</span>
      </div>

      <div className={styles.additionalInfo}>
        <span><strong>Market Cap:</strong> {market_cap}</span>
        <span><strong>Volume:</strong> {volume}</span>
      </div>
    </li>
  );
}

export default GainerLoserItem;
