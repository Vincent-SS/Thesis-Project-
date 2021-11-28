const getCurrentDate = () => {
  const currentDate = localStorage.getItem("currentDate");
  return currentDate;
};

export default getCurrentDate;
