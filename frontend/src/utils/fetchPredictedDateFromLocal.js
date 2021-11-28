const fetchPredictedDateFromLocal = () => {
  const selectedPredictedDate = localStorage.getItem("selectedPredictedDate");
  // console.log(selectedPredictedDate.split(',')[0]);
  return selectedPredictedDate.split(',')[0];
};

export default fetchPredictedDateFromLocal;