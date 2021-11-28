import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import getCurrentDate from '../../utils/fetchCurrentDateFromLocal';
import getPredictedDate from '../../utils/fetchPredictedDateFromLocal';
import getPredictedDay from '../../utils/fetchPredictedDayFromLocal';
import {getAllDatesForDisplayDateFormat, getAllDatesForDisplayStringFormat, getStringFormatDateForPrediction} from '../../utils/getAllDatesForDisplay';
import {getCurrentDateClosingPrice, getAllClosingPrice} from '../../utils/apiCall';
import axios from 'axios';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import TICKERS from '../../data/tickers';
import { format, parseISO, subDays } from "date-fns";
import SendIcon from '@mui/icons-material/Send';
// import CanvasJSReact from './canvasjs.react';
import '../../App.css';

const displayLineChart = (ticker,
  percentage_prediction, today_percentage, percentage0, percentage1, percentage2, percentage3, percentage4,
  predictedDateStringFormat, currentDate, previous_date0, previous_date1, previous_date2, previous_date3, previous_date4) => {
    // console.log(new Date(previous_date4).toISOString().substr(0, 10));
    const data = [];
    data.push({
      date: new Date(previous_date4).toISOString().substr(0, 10),
      value: percentage4,
    });
    data.push({
      date: new Date(previous_date3).toISOString().substr(0, 10),
      value: percentage3,
    })
    data.push({
      date: new Date(previous_date2).toISOString().substr(0, 10),
      value: percentage2,
    })
    data.push({
      date: new Date(previous_date1).toISOString().substr(0, 10),
      value: percentage1,
    })
    data.push({
      date: new Date(previous_date0).toISOString().substr(0, 10),
      value: percentage0,
    })
    data.push({
      date: new Date(currentDate).toISOString().substr(0, 10),
      value: today_percentage,
    })
    data.push({
      date: new Date(predictedDateStringFormat).toISOString().substr(0, 10),
      value: percentage_prediction,
      color: "red",
    })

    return (
      <ResponsiveContainer width="60%" height={300} className="chart">
      <AreaChart data={data} style={{"position": "relative", "left": "30%"}}>
        <Area dataKey="value" stroke="#4e55ff" fill="none" className="Area-modify"/>
        <XAxis
          dataKey="date"
        />

        <YAxis
          datakey="value"
          // axisLine={false}
          // tickLine={false}
          tickCount={9}
          tickFormatter={(number) => `${number.toFixed(1)}%`}
        />
        <Tooltip content={<ModifyHover />} />

        <CartesianGrid opacity={0.7} vertical={false} />
      </AreaChart>
      </ResponsiveContainer>
    );
};

const ModifyHover = ({active,payload,label}) => {
  if (!active) {
    return '';
  }
  console.log(payload[0].value);
  if (payload[0].value === -0.98 || payload[0].value === 1.4) {
    if (payload[0].value < 0) {
      return (
        <div style={{"border": "1px solid #6c009e", "padding": "5px 10px", "border-radius": "20px", "text-align": "center"}}>
          <p style={{"font-weight": "bold", "color": "red"}}>{format(parseISO(label), "d MMM, yyyy eeee")}</p>
          <p style={{"font-weight": "bold", "color": "red"}}>Prediction: {payload[0].value}%</p>
        </div>
      );
    } else {
      return (
        <div style={{"border": "1px solid #6c009e", "padding": "5px 10px", "border-radius": "20px", "text-align": "center"}}>
          <p style={{"font-weight": "bold", "color": "green"}}>{format(parseISO(label), "d MMM, yyyy eeee")}</p>
          <p style={{"font-weight": "bold", "color": "green"}}>Prediction: {payload[0].value}%</p>
        </div>
      );
    }
  }
  return (
    <div style={{"border": "1px solid #6c009e", "padding": "5px 10px", "border-radius": "20px", "text-align": "center"}}>
      <p style={{"font-weight": "bold", "color": "#454545"}}>{format(parseISO(label), "d MMM, yyyy eeee")}</p>
      <p style={{"font-weight": "bold", "color": "#454545"}}>{payload[0].value}%</p>
    </div>
  );
};

const InfoPage = () => {
  // Chosen company list
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  // Chosen current date
  const [currentDate, setCurrentDate] = useState(new Date().toString());
  // Chosen predicted date
  const [predictedDate, setPredictedDate] = useState(new Date().toString());
  // Chosen predicted days (e.g. 5 days after)
  const [predictedDay, setPredictedDay] = useState(1);
  // All past 5 days' date (e.g. currentDate-1, ..., currentDate-4, currentDate-5) to string format (2019-01-23)
  const [allDatesForDisplay, setAllDatesForDisplay] = useState([]);

  // Closing price for currentDate. Format: [{$TSLA: 123.2}, {$AAL: 23.4}, ...]
  const [currentDateClosingPrice, setCurrentDateClosingPrice] = useState([]);
  // Closing price for past 5 days' date (e.g. currentDate-1, ..., currentDate-5). Format: [{$TSLA: [233.4, 232.14 ...]}, {$AAL: }...]
  const [allClosingPrice, setAllClosingPrice] = useState([]);

  const [predictedDateStringFormat, setPredictedDateStringFormat] = useState('');
  const [daysAfter, setDaysAfter] = useState(1);

  useEffect(() => {
    // Get user selected companies
    const companies = localStorage.getItem("tickers").replaceAll(/\s/g,'');
    const companyList = companies.split(',');
    setSelectedCompanies([...companyList]);

    // Get current date
    const currentDate = getCurrentDate();
    setCurrentDate(currentDate);

    // Get predict date and predict day (e.g. 5 days after)
    const predictDate = getPredictedDate();
    setPredictedDate(predictDate);
    console.log(predictDate);
    const predictDay = getPredictedDay();
    setPredictedDay(predictDay);

    // Set the allDatesForDisplay
    const datesForDisplay = getAllDatesForDisplayStringFormat(currentDate);
    setAllDatesForDisplay(datesForDisplay);

    // Get the closing price for currentDate
    const currentDateClosingPrice = getCurrentDateClosingPrice(selectedCompanies, currentDate);
    setCurrentDateClosingPrice(currentDateClosingPrice);

    // Get the closing price for each displayed date
    const closingPrice = getAllClosingPrice(selectedCompanies, allDatesForDisplay);
    setAllClosingPrice(closingPrice);

    //
    const predictedDateStringFormat = getStringFormatDateForPrediction(predictDate);
    console.log(predictedDateStringFormat);
    setPredictedDateStringFormat(predictedDateStringFormat);
    const daysAfter = predictDay.split(' ')[1];
    console.log(daysAfter);
    setDaysAfter(daysAfter);
  }, []);

  const handleClick = (i, today_price, previous_price0, previous_price1, previous_price2, previous_price3, previous_price4, currentDate, previous_date0, previous_date1, previous_date2, previous_date3, previous_date4, predictionResult) => {
    console.log(i);
    console.log(selectedCompanies[i]);
    localStorage.setItem("detailTicker", selectedCompanies[i]);

    localStorage.setItem("detailPriceToday", today_price);
    localStorage.setItem("detailPrice0", previous_price0);
    localStorage.setItem("detailPrice1", previous_price1);
    localStorage.setItem("detailPrice2", previous_price2);
    localStorage.setItem("detailPrice3", previous_price3);
    localStorage.setItem("detailPrice4", previous_price4);

    localStorage.setItem("detailCurrentDate", currentDate);
    localStorage.setItem("detailDate0", previous_date0);
    localStorage.setItem("detailDate1", previous_date1);
    localStorage.setItem("detailDate2", previous_date2);
    localStorage.setItem("detailDate3", previous_date3);
    localStorage.setItem("detailDate4", previous_date4);

    // todo: localStorage setItem for prediction (detailPredictDate, detailPredictTrend)
    localStorage.setItem("detailPredictDate", predictedDateStringFormat);
    if (predictionResult === 1) {
      localStorage.setItem("detailPredictTrend", "Increase");
    } else {
      localStorage.setItem("detailPredictTrend", "Decrease");
    }

    // Get financial news
    axios.get('http://127.0.0.1:5000/historical-data/news/', {
      params: {
        Ticker: selectedCompanies[i],
        Date: currentDate
      }
    }, { headers: {
      'Content-Type': 'application/json'
    }}).then(r => {
      let i = 0;
      while (r.data[i] !== undefined) {
        window.localStorage.setItem('companyNews'+i.toString(), r.data[i]);
        i+=1;
      }
      window.location.href = '/detail';
    })

    console.log(today_price);
    console.log(currentDate);
    console.log(previous_date4);

  }

  /** Display each company as a block */
  const displayEachCompany = () => {
    const res = [];
    for (let i = 0; i < selectedCompanies.length; i++) {
      // Find the full name of the company
      const index = TICKERS.ALL_TICKERS.indexOf(selectedCompanies[i]);
      res.push(<div className="info-input">Date: {currentDate} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Company: {TICKERS.ALL_TICKERS_FULL_NAME[index]}&nbsp;&nbsp;</div>);
      res.push(<br />);

      // Display the ticker name (e.g. $TSLA)
      res.push(<div className="tickerName">Ticker: {selectedCompanies[i]}</div>);
      res.push(<div className="recentClosePrice">Recent closing price:</div>);

      // Display currentDate's closing price
      axios.get('http://127.0.0.1:5000/historical-data/closing-price/', {
        params: {
          Ticker: selectedCompanies[i],
          Date: currentDate
        }
      }, { headers: {
        'Content-Type': 'application/json'
      }}).then(r => {
        window.localStorage.setItem(selectedCompanies[i]+'Today', r.data.closing_price);
      })
      const today_price1 = window.localStorage.getItem(selectedCompanies[i]+'Today');
      const today_price = parseFloat(today_price1).toFixed(2).toString();
      // res.push(<div>{today_price}</div>);

      // Display the 1. Date, 2. share price for currentDate-1, ..., currentDate-4, currentDate-5,
      // and 3. the decrease/increase percentage, comparing with previous day
      axios.get('http://127.0.0.1:5000/historical-data/closing-price/', {
        params: {
          Ticker: selectedCompanies[i],
          Date: allDatesForDisplay[0]
        }
      }, { headers: {
        'Content-Type': 'application/json'
      }}).then(r => {
        window.localStorage.setItem(selectedCompanies[i]+allDatesForDisplay[0], r.data.closing_price);
      })
      const previous_price01 = window.localStorage.getItem(selectedCompanies[i]+allDatesForDisplay[0]);
      const previous_price0 = parseFloat(previous_price01).toFixed(2).toString();
      // Cal the percentage with previous day
      // const percentage0 = ((previous_price0 - today_price)/today_price * 100).toFixed(2);
      // if (percentage0 > 0) {
      //   res.push(<div>{allDatesForDisplay[0]} <span style={{color:"green"}}>{previous_price0} {percentage0}%</span></div>);
      // } else {
      //   res.push(<div>{allDatesForDisplay[0]} <span style={{color:"red"}}>{previous_price0} {percentage0}%</span></div>);
      // }

      axios.get('http://127.0.0.1:5000/historical-data/closing-price/', {
        params: {
          Ticker: selectedCompanies[i],
          Date: allDatesForDisplay[1]
        }
      }, { headers: {
        'Content-Type': 'application/json'
      }}).then(r => {
        window.localStorage.setItem(selectedCompanies[i]+allDatesForDisplay[1], r.data.closing_price);
      })
      const previous_price11 = window.localStorage.getItem(selectedCompanies[i]+allDatesForDisplay[1]);
      const previous_price1 = parseFloat(previous_price11).toFixed(2).toString();
      // const percentage1 = ((previous_price1 - previous_price0)/previous_price0 * 100).toFixed(2);
      // if (percentage1 > 0) {
      //   res.push(<div>{allDatesForDisplay[1]} <span style={{color:"green"}}>{previous_price1} {percentage1}%</span></div>);
      // } else {
      //   res.push(<div>{allDatesForDisplay[1]} <span style={{color:"red"}}>{previous_price1} {percentage1}%</span></div>);
      // }

      axios.get('http://127.0.0.1:5000/historical-data/closing-price/', {
        params: {
          Ticker: selectedCompanies[i],
          Date: allDatesForDisplay[2]
        }
      }, { headers: {
        'Content-Type': 'application/json'
      }}).then(r => {
        window.localStorage.setItem(selectedCompanies[i]+allDatesForDisplay[2], r.data.closing_price);
      })
      const previous_price21 = window.localStorage.getItem(selectedCompanies[i]+allDatesForDisplay[2]);
      const previous_price2 = parseFloat(previous_price21).toFixed(2).toString();
      // const percentage2 = ((previous_price2 - previous_price1)/previous_price1 * 100).toFixed(2);
      // if (percentage2 > 0) {
      //   res.push(<div>{allDatesForDisplay[2]} <span style={{color:"green"}}>{previous_price2} {percentage2}%</span></div>);
      // } else {
      //   res.push(<div>{allDatesForDisplay[2]} <span style={{color:"red"}}>{previous_price2} {percentage2}%</span></div>);
      // }

      axios.get('http://127.0.0.1:5000/historical-data/closing-price/', {
        params: {
          Ticker: selectedCompanies[i],
          Date: allDatesForDisplay[3]
        }
      }, { headers: {
        'Content-Type': 'application/json'
      }}).then(r => {
        window.localStorage.setItem(selectedCompanies[i]+allDatesForDisplay[3], r.data.closing_price);
      })
      const previous_price31 = window.localStorage.getItem(selectedCompanies[i]+allDatesForDisplay[3]);
      const previous_price3 = parseFloat(previous_price31).toFixed(2).toString();
      // const percentage3 = ((previous_price3 - previous_price2)/previous_price2 * 100).toFixed(2);
      // if (percentage3 > 0) {
      //   res.push(<div>{allDatesForDisplay[3]} <span style={{color:"green"}}>{previous_price3} {percentage3}%</span></div>);
      // } else {
      //   res.push(<div>{allDatesForDisplay[3]} <span style={{color:"red"}}>{previous_price3} {percentage3}%</span></div>);
      // }

      axios.get('http://127.0.0.1:5000/historical-data/closing-price/', {
        params: {
          Ticker: selectedCompanies[i],
          Date: allDatesForDisplay[4]
        }
      }, { headers: {
        'Content-Type': 'application/json'
      }}).then(r => {
        window.localStorage.setItem(selectedCompanies[i]+allDatesForDisplay[4], r.data.closing_price);
      })
      const previous_price41 = window.localStorage.getItem(selectedCompanies[i]+allDatesForDisplay[4]);
      const previous_price4 = parseFloat(previous_price41).toFixed(2).toString();
      // const percentage4 = ((previous_price4 - previous_price3)/previous_price3 * 100).toFixed(2);
      // if (percentage4 > 0) {
      //   res.push(<div>{allDatesForDisplay[4]} <span style={{color:"green"}}>{previous_price4} {percentage4}%</span></div>);
      // } else {
      //   res.push(<div>{allDatesForDisplay[4]} <span style={{color:"red"}}>{previous_price4} {percentage4}%</span></div>);
      // }
      // Cal percentage
      const percentage4 = 0;
      const percentage3 = ((previous_price3 - previous_price4)/previous_price4 * 100).toFixed(2);
      const percentage2 = ((previous_price2 - previous_price3)/previous_price3 * 100).toFixed(2);
      const percentage1 = ((previous_price1 - previous_price2)/previous_price2 * 100).toFixed(2);
      const percentage0 = ((previous_price0 - previous_price1)/previous_price1 * 100).toFixed(2);
      const percentage_today = ((today_price - previous_price0)/previous_price0 * 100).toFixed(2);
      if (percentage_today >= 0) {
        res.push(<span className="displayPrice">{currentDate}: <span style={{color:"green"}}>${today_price} {percentage_today}%</span></span>);
      } else {
        res.push(<span className="displayPrice">{currentDate}: <span style={{color:"red"}}>${today_price} {percentage_today}%</span></span>);
      }
      if (percentage0 >= 0) {
        res.push(<span className="displayPrice">{allDatesForDisplay[0]}: <span style={{color:"green"}}>${previous_price0} {percentage0}%</span></span>);
      } else {
        res.push(<span className="displayPrice">{allDatesForDisplay[0]}: <span style={{color:"red"}}>${previous_price0} {percentage0}%</span></span>);
      }
      res.push(<br />);
      if (percentage1 >= 0) {
        res.push(<span className="displayPrice">{allDatesForDisplay[1]}: <span style={{color:"green"}}>${previous_price1} {percentage1}%</span></span>);
      } else {
        res.push(<span className="displayPrice">{allDatesForDisplay[1]}: <span style={{color:"red"}}>${previous_price1} {percentage1}%</span></span>);
      }
      if (percentage2 >= 0) {
        res.push(<span className="displayPrice">{allDatesForDisplay[2]}: <span style={{color:"green"}}>${previous_price2} {percentage2}%</span></span>);
      } else {
        res.push(<span className="displayPrice">{allDatesForDisplay[2]}: <span style={{color:"red"}}>${previous_price2} {percentage2}%</span></span>);
      }
      res.push(<br />);
      if (percentage3 >= 0) {
        res.push(<span className="displayPrice">{allDatesForDisplay[3]}: <span style={{color:"green"}}>${previous_price3} {percentage3}%</span></span>);
      } else {
        res.push(<span className="displayPrice">{allDatesForDisplay[3]}: <span style={{color:"red"}}>${previous_price3} {percentage3}%</span></span>);
      }
      if (percentage4 >= 0) {
        res.push(<span className="displayPrice">{allDatesForDisplay[4]}: <span style={{color:"green"}}>${previous_price4} {percentage4}%</span></span>);
      } else {
        res.push(<span className="displayPrice">{allDatesForDisplay[4]}: <span style={{color:"red"}}>${previous_price4} {percentage4}%</span></span>);
      }
      res.push(<br />);
      // ABOVE: Display share price for currentDate-1 ... currentDate-5

      // Display prediction trend

      axios.get('http://127.0.0.1:5000/historical-data/prediction/', {
        params: {
          Ticker: selectedCompanies[i],
          Date: predictedDateStringFormat,
          DaysAfter: daysAfter,
        }
      }, { headers: {
        'Content-Type': 'application/json'
      }}).then(r => {
        window.localStorage.setItem(selectedCompanies[i]+predictedDateStringFormat+daysAfter, r.data.prediction);
      })
      const predictionResult = window.localStorage.getItem(selectedCompanies[i]+predictedDateStringFormat+daysAfter);
      res.push(<div className="displayPrice">You are predicting <span style={{color:"#4E55FF",fontWeight:"bold"}}>{predictedDay}</span> - {predictedDate} :</div>);
      let percentage_prediction = 0;
      if (predictionResult === "1") {
        percentage_prediction = percentage_today >= 0 ? percentage_today*2 : -percentage_today*2;
        res.push(<div className="displayPrice">Prediction result: <span style={{color:"green",fontWeight: "bold",fontSize:"20px"}}>Increase</span></div>);
      } else {
        percentage_prediction = percentage_today >= 0 ? -percentage_today*2 : percentage_today*2;
        res.push(<div className="displayPrice">Prediction result: <span style={{color:"red",fontWeight: "bold",fontSize:"20px"}}>Decrease</span></div>);
      };


      // Display line chart
      res.push(displayLineChart(selectedCompanies[i],
        percentage_prediction, percentage_today, percentage0, percentage1, percentage2, percentage3, percentage4,
        predictedDateStringFormat, currentDate, allDatesForDisplay[0], allDatesForDisplay[1], allDatesForDisplay[2], allDatesForDisplay[3], allDatesForDisplay[4]));

      // Button to learn more
      const clickButton = <Button className="ButtonLearnMore" onClick={() => handleClick(i, today_price, previous_price0, previous_price1, previous_price2, previous_price3, previous_price4, currentDate, allDatesForDisplay[0], allDatesForDisplay[1], allDatesForDisplay[2], allDatesForDisplay[3], allDatesForDisplay[4], predictionResult)} variant="contained" endIcon={<SendIcon />}>Click to learn more</Button>
      res.push(clickButton)

      // Bottom separator
      res.push(<div style={{border: "2px dashed #4E55FF", opacity:"0.5", width: "90%", margin: "auto", marginTop: "2%", marginBottom: "5%"}}></div>);
    }
    // console.log(TICKERS);

    return res;
  };

  return (
    <div>
      <div className="displayCompany">{displayEachCompany()}</div>
      {/* <br /> */}
      {/* {predictedDate} */}
      {/* <br /> */}
      {/* {predictedDay} */}
    </div>
  )
};

export default InfoPage;
