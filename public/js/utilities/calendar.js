function daysInMonthCard(selectedDay) {
  const dateObj = dateObject(selectedDay);

  let dayToDisplayOnCard = [];

  for (let i = 0; i < dateObj.firstDayOfMonth.getDay(); i++) {
    const localDate = new Date(
      dateObj.y,
      dateObj.m,
      i + 1 - dateObj.firstDayOfMonth.getDay()
    );

    const mmddyy = getMMDDYYYY(localDate);
    dayToDisplayOnCard.push({ tileData: "-", dateData: mmddyy });
  }

  for (let i = 1; i < dateObj.numberOfDaysInMonth + 1; i++) {
    const localDate = new Date(dateObj.y, dateObj.m, i);
    const mmddyy = getMMDDYYYY(localDate);
    dayToDisplayOnCard.push({ tileData: i, dateData: mmddyy });
  }

  for (let i = 0; i < 6 - dateObj.lastDayOfMonth.getDay(); i++) {
    const localDate = new Date(dateObj.y, dateObj.m + 1, i + 1);
    const mmddyy = getMMDDYYYY(localDate);
    dayToDisplayOnCard.push({ tileData: "-", dateData: mmddyy });
  }

  return dayToDisplayOnCard;
}

function textInDateCard(selectedDate) {
  const obj = dateObject(selectedDate);
  const { y, d, monthName, weekdayName } = obj;
  return { y, d, monthName, weekdayName };
}

function monthString(date) {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return month[date.getMonth()];
}

function weekdayString(date) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[date.getDay()];
}

function dateObject(date) {
  const hr = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const m = date.getMonth();
  const d = date.getDate();
  const y = date.getFullYear();

  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const numberOfDaysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const monthName = monthString(date);
  const weekdayName = weekdayString(date);

  return {
    y,
    m,
    d,
    hr,
    min,
    sec,
    monthName,
    weekdayName,
    firstDayOfMonth,
    lastDayOfMonth,
    numberOfDaysInMonth,
  };
}

function getMMDDYYYY(date) {
  return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
}

export default {
  daysInMonthCard,
  textInDateCard,
  monthString,
  weekdayString,
  getMMDDYYYY
};
