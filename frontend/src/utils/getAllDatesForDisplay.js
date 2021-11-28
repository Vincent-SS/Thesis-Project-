import isWeekend from "./isWeekend";

const getPreviousDate = (date) => {
  const res = new Date(date);
  res.setDate(res.getDate() - 1);
  if (isWeekend(res)) {
    res.setDate(res.getDate() - 1);
  }
  if (isWeekend(res)) {
    res.setDate(res.getDate() - 1);
  }
  return res;
};

const getAllDatesForDisplayDateFormat = (currentDate) => {
  console.log("currentDate: "+currentDate);
  const currentDateDateFormat = new Date(currentDate.split('-')[0], currentDate.split('-')[1]-1, currentDate.split('-')[2]);
  console.log("currentDateDateFormat: "+currentDateDateFormat);

  // currentDateDateFormat1
  const currentDateDateFormat1 = getPreviousDate(currentDate);
  console.log("1: " + currentDateDateFormat1);

  // currentDateDateFormat2
  const currentDateDateFormat2 = getPreviousDate(currentDateDateFormat1);
  console.log("2: " + currentDateDateFormat2);

  // currentDateDateFormat3
  const currentDateDateFormat3 = getPreviousDate(currentDateDateFormat2);
  console.log("3: " + currentDateDateFormat3);

  // currentDateDateFormat4
  const currentDateDateFormat4 = getPreviousDate(currentDateDateFormat3);
  console.log("4: " + currentDateDateFormat4);

  // currentDateDateFormat5
  const currentDateDateFormat5 = getPreviousDate(currentDateDateFormat4);
  console.log("5: " + currentDateDateFormat5);

  // Concat them into an array
  const res = [];
  res.push(currentDateDateFormat1);
  res.push(currentDateDateFormat2);
  res.push(currentDateDateFormat3);
  res.push(currentDateDateFormat4);
  res.push(currentDateDateFormat5);

  return res;
};

// Get all dates for display in string format (yyyy-mm-dd)
const getAllDatesForDisplayStringFormat = (currentDate) => {
  const resDateFormat = getAllDatesForDisplayDateFormat(currentDate);
  const res = [];
  // Convert to yyyy-mm-dd format
  for (let i = 0; i < resDateFormat.length; i++) {
    let month = resDateFormat[i].getMonth() + 1;
    if (month.toString().length < 2) {
      month = '0' + month.toString();
    }

    const tempString = resDateFormat[i].toString();

    res.push(resDateFormat[i].getFullYear()+'-'+month+'-'+tempString.substring(8, 10));
  }

  // console.log(res);
  return res;
};

// Convert dd/mm/yy ww format to yyyy-mm-dd
const getStringFormatDateForPrediction = (predictedDate) => {
  const firstPart = predictedDate.split(' ')[0];
  const day = firstPart.split('/')[0];
  const month = firstPart.split('/')[1];
  const year = firstPart.split('/')[2];
  const fullYear = "20"+year.toString();
  const fullMonth = month.toString().length === 1 ? "0"+month.toString() : month.toString();
  const fullDay = day.length === 1 ? "0"+day.toString() : day.toString();
  return fullYear+'-'+fullMonth+'-'+fullDay;
};

export { getAllDatesForDisplayDateFormat, getAllDatesForDisplayStringFormat, getStringFormatDateForPrediction };
