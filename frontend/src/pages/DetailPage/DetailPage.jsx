import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import TICKERS from '../../data/tickers';
import './detail.css'

const DetailPage = () => {
  const [ticker, setTicker] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [priceToday, setPriceToday] = useState('');
  const [previousPrice, setPreviousPrice] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [previousDate, setPreviousDate] = useState([]);
  const [predictDate, setPredictDate] = useState('');
  const [predictTrend, setPredictTrend] = useState('');
  const [allNews, setAllNews] = useState([]);

  const displayCompanyTitle = () => {
    return (
      <h1 className="detail-company-title">
        {ticker} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {companyName}
      </h1>
    );
  };

  const displayPrice = () => {
    const percentage4 = 0;
    const percentage3 = ((previousPrice[3] - previousPrice[4])/previousPrice[4] * 100).toFixed(2);
    const percentage2 = ((previousPrice[2] - previousPrice[3])/previousPrice[3] * 100).toFixed(2);
    const percentage1 = ((previousPrice[1] - previousPrice[2])/previousPrice[2] * 100).toFixed(2);
    const percentage0 = ((previousPrice[0] - previousPrice[1])/previousPrice[1] * 100).toFixed(2);
    const percentage_today = ((priceToday - previousPrice[0])/previousPrice[0] * 100).toFixed(2);
    const res = [];
    // res.push(<div>{percentage1}</div>);
    if (percentage_today >= 0) {
      res.push(<span className="detailPrice">{currentDate}: <span style={{color:"green"}}>${priceToday} {percentage_today}%</span></span>);
    } else {
      res.push(<span className="detailPrice">{currentDate}: <span style={{color:"red"}}>${priceToday} {percentage_today}%</span></span>);
    }
    if (percentage0 >= 0) {
      res.push(<span className="detailPrice">{previousDate[0]}: <span style={{color:"green"}}>${previousPrice[0]} {percentage0}%</span></span>);
    } else {
      res.push(<span className="detailPrice">{previousDate[0]}: <span style={{color:"red"}}>${previousPrice[0]} {percentage0}%</span></span>);
    }
    res.push(<br />);
    // if (percentage1 >= 0) {
    //   res.push(<span className="detailPrice">{previousDate[1]}: <span style={{color:"green"}}>${previousPrice[1]} {percentage1}%</span></span>);
    // } else {
    //   res.push(<span className="detailPrice">{previousDate[1]}: <span style={{color:"red"}}>${previousPrice[1]} {percentage1}%</span></span>);
    // }
    // if (percentage2 >= 0) {
    //   res.push(<span className="detailPrice">{previousDate[2]}: <span style={{color:"green"}}>${previousPrice[2]} {percentage2}%</span></span>);
    // } else {
    //   res.push(<span className="detailPrice">{previousDate[2]}: <span style={{color:"red"}}>${previousPrice[2]} {percentage2}%</span></span>);
    // }
    // res.push(<br />);
    // if (percentage3 >= 0) {
    //   res.push(<span className="detailPrice">{previousDate[3]}: <span style={{color:"green"}}>${previousPrice[3]} {percentage3}%</span></span>);
    // } else {
    //   res.push(<span className="detailPrice">{previousDate[3]}: <span style={{color:"red"}}>${previousPrice[3]} {percentage3}%</span></span>);
    // }
    // if (percentage4 >= 0) {
    //   res.push(<span className="detailPrice">{previousDate[4]}: <span style={{color:"green"}}>${previousPrice[4]} {percentage4}%</span></span>);
    // } else {
    //   res.push(<span className="detailPrice">{previousDate[4]}: <span style={{color:"red"}}>${previousPrice[4]} {percentage4}%</span></span>);
    // }
    // res.push(<br />);

    return (
      <div className="detailPrice">
        {res}
      </div>
    );
  };

  const trendStyle = () => {
    if (predictTrend === 'Increase') {
      return (
        <span style={{color:"green",fontWeight: "bold",fontSize:"20px"}}>Increase</span>
      );
    } else {
      return (
        <span style={{color:"red",fontWeight: "bold",fontSize:"35px"}}>Decrease</span>
      );
    }
  };

  const displayPredictTrend = () => {
    // todo: predictive trend
    return (
      <h3 className="prediction">
        Date Predictive Price Trend: {trendStyle()}
      </h3>
    );
  };

  const displayEachNews = () => {
    const res = [];
    for (let i = 0; i <= 4; i++) {
      if (allNews[i] == null) {
        break;
      }
      const split = allNews[i].split(',');
      const eachRes = [];
      eachRes.push(<div className="newsEach"><a href={split[2]} target='_blank'>{split[0]}<img src={split[1]} /></a></div>);
      // eachRes.push(<img src={split[1]} />);
      eachRes.push(<br />);
      res.push(eachRes);
    }
    return res;
  }

  const displayNews = () => {
    // todo: display news
    return (
      <div className="news">
        <br /> <br />
        <h2>{currentDate}'s Financial News:</h2>
        {displayEachNews()}
      </div>
    );
  };

  useEffect(() => {
    // Get user selected detail ticker
    const ticker = localStorage.getItem("detailTicker").replaceAll(/\s/g,'');
    setTicker(ticker);

    // Find the full name of the company
    const index = TICKERS.ALL_TICKERS.indexOf(ticker);
    setCompanyName(TICKERS.ALL_TICKERS_FULL_NAME[index]);

    // set historical price
    const priceToday = localStorage.getItem("detailPriceToday");
    setPriceToday(priceToday);

    const previous0 = localStorage.getItem("detailPrice0");
    const previous1 = localStorage.getItem("detailPrice1");
    const previous2 = localStorage.getItem("detailPrice2");
    const previous3 = localStorage.getItem("detailPrice3");
    const previous4 = localStorage.getItem("detailPrice4");
    const previous = [];
    previous.push(previous0);
    previous.push(previous1);
    previous.push(previous2);
    previous.push(previous3);
    previous.push(previous4);
    setPreviousPrice(previous);

    // set previous dates
    const currentDate = localStorage.getItem("detailCurrentDate");
    setCurrentDate(currentDate);

    const previousDate0 = localStorage.getItem("detailDate0");
    const previousDate1 = localStorage.getItem("detailDate1");
    const previousDate2 = localStorage.getItem("detailDate2");
    const previousDate3 = localStorage.getItem("detailDate3");
    const previousDate4 = localStorage.getItem("detailDate4");
    const previousDate = [];
    previousDate.push(previousDate0);
    previousDate.push(previousDate1);
    previousDate.push(previousDate2);
    previousDate.push(previousDate3);
    previousDate.push(previousDate4);
    setPreviousDate(previousDate);

    // Set prediction date
    const predictDate = localStorage.getItem("detailPredictDate");
    setPredictDate(predictDate);
    // Set prediction trend
    const predictTrend = localStorage.getItem("detailPredictTrend");
    setPredictTrend(predictTrend);

    // Get financial news
    // let i = 0;
    const allNews = [];
    // while (localStorage.getItem("companyNews"+i.toString()) !== null) {
    //   allNews.push(localStorage.getItem("companyNews"+i.toString()));
    //   console.log("h");
    //   i++;
    // }
    for (let i = 0; i <= 4; i++) {
      allNews.push(localStorage.getItem("companyNews"+i.toString()));
    }
    // const allNews = localStorage.getItem("companyNewss");
    setAllNews(allNews);
    console.log(allNews);
  }, []);

  return (
    <div>
      {/* {ticker} {companyName} {priceToday} {previousPrice} */}
      {displayCompanyTitle()}
      {displayPrice()}
      {displayPredictTrend()}
      {displayNews()}
    </div>
  )
};

export default DetailPage;
