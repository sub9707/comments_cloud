// 날짜 포맷팅
const getTodayFormat = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}.${month}.${day}`;
  return formattedDate;
};

module.exports = getTodayFormat;
