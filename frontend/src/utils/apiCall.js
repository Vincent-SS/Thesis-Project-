import axios from 'axios';

const axiosCall = (tickers, date) => {
  console.log("asdfasdf");
  const res = [];
  for (let i = 0; i < tickers.length; i++) {
    axios.get('http://127.0.0.1:5000/historical-data/closing-price/', {
      params: {
        Ticker: tickers[i],
        Date: date
      }
    }, { headers: {
      'Content-Type': 'application/json'
    }}).then(r => {
      // return r.data.closing_price;
      // tickers[i] = r.data.closing_price;
      // res.push(tickers[i].price);
      // console.log(r.data.closing_price);
      // let curr = {};
      // curr.price = r.data.closing_price;
      // res.push({curr: curr});
      // console.log(res);
      console.log(r.data.closing_price);
      window.localStorage.setItem(tickers[i]+"Today", r.data.closing_price);
    });
  };
  return res;
};

const getCurrentDateClosingPrice = async (tickers, date) => {
  const res = await axiosCall(tickers, date);
  console.log(res);
};

const getAllClosingPrice = (tickers, dates) => {

};

export {getCurrentDateClosingPrice, getAllClosingPrice};
