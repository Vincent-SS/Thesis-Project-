/**
 * @description
 * Convert a date format to DD/MM/YYYY WEEK_DAY
 * @param date in YYYY-MM-DD format
 * @return date in DD/MM/YYYY WEEK_DAY format
 */
const dateConvertDayMonthYear = (
  date
) => {
  // console.log("here" + date);
  const res = new Date(date.split('-')[0], date.split('-')[1]-1, date.split('-')[2]);
  console.log(res);
  // console.log(res.getDay());
  let weekday;
  switch (res.getDay()) {
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

  const returnDate = date.split('-')[2]+"/"+date.split('-')[1]+"/"+date.split('-')[0]+" "+weekday;
  // console.log(typeof(result));
  console.log(returnDate);
  return returnDate;
};

export default dateConvertDayMonthYear;
