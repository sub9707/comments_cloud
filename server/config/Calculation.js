// 날짜 포맷팅
const getTodayFormat = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}.${month}.${day}`;
  return formattedDate;
};
// 날짜 포맷팅
const getTodayTimeFormat = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");

  const formattedDateTime = `${year}.${month}.${day} ${hours}:${minutes}`;
  return formattedDateTime;
};

module.exports = {
  getTodayFormat,
  getTodayTimeFormat,
};
