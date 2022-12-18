function daysInMonthCard(selectedDay) {
  const dateObj = dateObject(selectedDay);

  // const numberOfDaysInCard =
  //   dateObj.numberOfDaysInMonth +
  //   dateObj.firstDayOfMonth.getDay() +
  //   (6 - dateObj.lastDayOfMonth.getDay());

  // console.log("numberOfDaysInCard: ", numberOfDaysInCard);

  let dayToDisplayOnCard = [];

  for (let i = 0; i < dateObj.firstDayOfMonth.getDay(); i++) {
    let localDate = new Date(
      dateObj.y,
      dateObj.m,
      i + 1 - dateObj.firstDayOfMonth.getDay()
    );
    dayToDisplayOnCard.push({ tileData: "-", dateData: localDate });
  }

  for (let i = 1; i < dateObj.numberOfDaysInMonth + 1; i++) {
    let localDate = new Date(dateObj.y, dateObj.m, i);
    dayToDisplayOnCard.push({ tileData: i, dateData: localDate });
  }

  for (let i = 0; i < 6 - dateObj.lastDayOfMonth.getDay(); i++) {
    let localDate = new Date(dateObj.y, dateObj.m + 1, i + 1);
    dayToDisplayOnCard.push({ tileData: "-", dateData: localDate });
  }

  return dayToDisplayOnCard;
}

function textInDateCard(selectedDate) {
  const obj = dateObject(selectedDate);
  const { y, d, monthName, weekdayName } = obj;
  return { y, d, monthName, weekdayName };
}

function monthWeekdayString(date) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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

  const wd = weekday[date.getDay()];
  const mt = month[date.getMonth()];

  return { monthName: mt, weekdayName: wd };
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

  const { monthName, weekdayName } = monthWeekdayString(date);

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

export default {
  daysInMonthCard,
  textInDateCard,
};
