import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ALL_TICKERS from '../../data/tickers';
import dateConvertDayMonthYear from '../../utils/dateConvertDayMonthYear';
import isWeekend from '../../utils/isWeekend';
import './inputPage.css';

const InputPage = () => {
  const [isLoadingLeft, setIsLoadingLeft] = useState(false);
  const [isLoadingRight, setIsLoadingRight] = useState(false);
  const [tickers, setTickers] = useState('');
  const [errorLeft, setErrorLeft] = useState(false);
  const [errorRight, setErrorRight] = useState(false);
  const [currentDate, setCurrentDate] = useState('2019-05-07');
  const [predictedDate, setPredictedDate] = useState([]);
  const [selectedPredictedDate, setSelectedPredictedDate] = useState(0);

  useEffect(() => {
    /** Check date validation (not saturday, sunday) */
    const current = new Date(currentDate.split('-')[0], currentDate.split('-')[1]-1, currentDate.split('-')[2]);
    if (isWeekend(current)) {
      setErrorRight(true);
      return;
    }
    setErrorRight(false);
    // console.log(current);
    const availableDateForPredict = [];
    let i = 1, j = 1;
    while (j < 8) {
      const tmr = new Date(current.valueOf());
      tmr.setDate(tmr.getDate()+i);
      // console.log(tmr+" "+i);
      if (!isWeekend(tmr)){
        availableDateForPredict.push(tmr);
        j++;
      }
      i++;
    }

    // console.log(availableDateForPredict);
    const res = [];
    for (let i = 0; i < availableDateForPredict.length; i++) {
      let weekday;
      switch (availableDateForPredict[i].getDay()) {
        case 0:
          weekday = "Sun";
          break;
        case 1:
          weekday = "Mon";
          break;
        case 2:
          weekday = "Tue";
          break;
        case 3:
          weekday = "Wed";
          break;
        case 4:
          weekday = "Thu";
          break;
        case 5:
          weekday = "Fri";
          break;
        case 6:
          weekday = "Sat";
          break;
        default:
          break;
      };
      const daysAfter = i+1;
      const month = availableDateForPredict[i].getMonth()+1;
      res.push(availableDateForPredict[i].getDate()+"/"+month+"/"+availableDateForPredict[i].getFullYear().toString().substring(2,4)+" "+weekday+", "+daysAfter+" days after");
    //   // res.push(dateConvertDayMonthYear(availableDateForPredict[i]));
    }

    window.localStorage.setItem('currentDate', currentDate);

    setPredictedDate(res);
    // console.log(("useEffct " + res));

  }, [currentDate]);

  useEffect(() => {
    window.localStorage.setItem('selectedPredictedDate', selectedPredictedDate);
  }, [selectedPredictedDate])

  const handleSubmit = (e) => {
    e.preventDefault();

    /** Convert tickers to uppercase */
    const tickersUpper = tickers.toUpperCase();

    /** Convert tickers to list of string, and remove white spaces */
    const tickerList = tickersUpper.split(',');
    const tickerListTrim = tickerList.map(x => x.trim());

    /** Check tickers' validation */
    let tickerValidation = true;
    for (const t in tickerListTrim) {
      if (!ALL_TICKERS.ALL_TICKERS.includes(tickerListTrim[t])) {
        console.log(t);
        tickerValidation = false;
      }
    }
    if (!tickerValidation) {
      setErrorLeft(true);
      return;
    }
    setErrorLeft(false);
    console.log(tickerValidation);
    console.log(tickerListTrim);
    console.log(...new Set(tickerListTrim));
    const tickerListNoDup = new Set(tickerListTrim);
    const tickersStore = [...tickerListNoDup];
    console.log(tickersStore);

    /** Set stocks name in localStorage, start with button loading animation */
    setIsLoadingLeft(true);
    window.localStorage.clear();
    (async () => {
      window.localStorage.clear();
      window.localStorage.setItem('tickers', tickersStore);
      setTimeout(() => {setIsLoadingLeft(false)}, 1000);
    })();
  };

  const handleSubmitDate = (e) => {
    e.preventDefault();

    /** Check date validation (not saturday, sunday) */
    const current = new Date(currentDate.split('-')[0], currentDate.split('-')[1]-1, currentDate.split('-')[2]);
    if (isWeekend(current)) {
      setErrorRight(true);
      return;
    }

    // window.localStorage.setItem('currentDate', currentDate);
    // window.localStorage.setItem('selectedPredictedDate', selectedPredictedDate);

    setErrorRight(false);
    window.location.href = "/info";
  };

  const handleOnChangeTicker = (e) => setTickers(e.target.value);
  const handleOnChangeCurrentDate = (e) => {
    setCurrentDate(e.target.value);
    // console.log(currentDate);
  }

  const handleOnChangePredictedDate = (e) => setPredictedDate(e.target.value);
  const handleOnChangeSelectedPredictedDate = (e) => setSelectedPredictedDate(e.target.value);

  const choosePredictedDateList = () => {
    const res = [];
    for (let i = 0; i < predictedDate.length; i++) {
      res.push(<MenuItem value={predictedDate[i]}>{predictedDate[i]}</MenuItem>)
    }
    // console.log(res);
    return res;
  }

  return (
    <div className="body">
      <div className="box">
        <Box className="item" sx={{ width: 420, height: 450, }} onSubmit={handleSubmit} component="form">
          <p className="subtitle">1. Please type the companies you are interested in</p>
          <br />
          <TextField
            id="standard-helperText"
            label="I'm interested in..."
            required
            value={tickers}
            onChange={handleOnChangeTicker}
            variant="standard"
            helperText="e.g. $PFE, $AAL"
          />
          <br /><br /><br />
          {isLoadingLeft
              ? <LoadingButton loading  variant="contained" className="addTickerButton">Add</LoadingButton>
              : <Button variant="contained" type="submit" className="addTickerButton">Add</Button>}
          <br /><br /><br /><br />
          <p className="bottomNote">Click <a href="/ticker" className="here">here</a> to see available companies</p>
          {errorLeft ?
            <Alert variant="outlined" severity="error" className="errorLeft">
              Some companies are not supported - please see available companies below and try again.
            </Alert> : ''
          }
        </Box>
        <Box className="item" sx={{ width: 420, height: 450, }} onSubmit={handleSubmitDate} component="form">
          <p className="subtitle">2. Please select your interested date</p>
          <br />
          <p className="subsubtitle">2.1. The date you'd like to be on (as the definition of 'today')</p>
          <TextField
            id="date"
            label=""
            type="date"
            value={currentDate}
            onChange={handleOnChangeCurrentDate}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br /><br /><br />
          <p className="subsubtitle">2.2. The date you'd like to be predicted</p>
          <FormControl className="predictedDate">
            <InputLabel id="demo-simple-select-label">I'd like to predict...</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedPredictedDate}
              label="I want to predict..."
              onChange={handleOnChangeSelectedPredictedDate}
            >
              {choosePredictedDateList()}
            </Select>
          </FormControl>
          <br /><br /><br />
          {isLoadingRight
              ? <LoadingButton loading  variant="contained" className="addDateButton">Confirm</LoadingButton>
              : <a href="#"><Button variant="contained" type="submit" className="addDateButton">Confirm</Button></a>}
          <br />
          {errorRight ?
            <Alert variant="outlined" severity="error" className="errorRight">
              Stock market closed on weekends - please try again.
            </Alert> : ''
          }
        </Box>
      </div>
    </div>
  )
};

export default InputPage;
