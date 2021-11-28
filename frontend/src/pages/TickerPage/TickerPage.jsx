import React from 'react';
import tickers from '../../data/tickers';
import './tickerPage.css';

const TickerPage = () => {
  const displayAllTickers = () => {
    const res = [];
    for (let i = 0; i < tickers.ALL_TICKERS_FULL_NAME.length; i++) {
      res.push(<div className="row"><a target="_blank" rel="noreferrer" href={tickers.ALL_TICKERS_LINKS[i]}>{tickers.ALL_TICKERS_FULL_NAME[i]}&nbsp; &nbsp; &nbsp; &nbsp;<img src={"logo"+(i+1).toString()+".png"} alt="logo" /></a><br /></div>);
    }
    return res;
  }

  return (
    <div>
      <div className="currentSupport">
        <h3>The system supports {tickers.ALL_TICKERS.length} companies listed on <a target="_blank" rel="noreferrer" href="https://en.wikipedia.org/wiki/List_of_S%26P_500_companies">S&P500</a>:</h3><br />
        {displayAllTickers()}
      </div>
    </div>
  )
};

export default TickerPage;
