const moment = require("moment");

const dateOffset = new Date().getTimezoneOffset() * 60000;
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

const getStartAndEndOfMonth = () => {
  const today = new Date();

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const formattedStartOfMonth = startOfMonth.toISOString().split("T")[0];
  const formattedEndOfMonth = endOfMonth.toISOString().split("T")[0];

  return {
    startOfMonth: formattedStartOfMonth,
    endOfMonth: formattedEndOfMonth,
  };
};

const getCurrentTime = () => {
  const utcNow = new Date();

  const kOffset = 9 * 60;
  const kNow = new Date(utcNow.getTime() + kOffset * 60000);

  return kNow.toISOString();
};

module.exports = {
  dateOffset,
  getTodayFormat,
  getTodayTimeFormat,
  getStartAndEndOfMonth,
  getCurrentTime,
};
