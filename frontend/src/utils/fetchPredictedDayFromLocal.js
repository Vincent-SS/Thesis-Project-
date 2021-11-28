const fetchPredictedDayFromLocal = () => {
  const selectedPredictedDay = localStorage.getItem("selectedPredictedDate");
  return selectedPredictedDay.split(',')[1];
};

export default fetchPredictedDayFromLocal;