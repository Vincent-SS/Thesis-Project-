/**
 * @description
 * Check a date if it's on weekends
 * @param date Date
 * @return boolean true if it's weekend, false otherwise
 */
const isWeekend = (
  date
) => {
  if (date.getDay() === 0 || date.getDay() === 6) {
    return true;
  }
  return false;
};

export default isWeekend;
