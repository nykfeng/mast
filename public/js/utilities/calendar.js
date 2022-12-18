function daysInMonthCard(selectedDay) {
//   const selectedDay = new Date();
  const hr = selectedDay.getHours();
  const min = selectedDay.getMinutes();
  const sec = selectedDay.getSeconds();
  const d = selectedDay.getDate();
  const y = selectedDay.getFullYear();

  const firstDayOfMonth = new Date(selectedDay.getFullYear(), selectedDay.getMonth(), 1);
  const lastDayOfMonth = new Date(selectedDay.getFullYear(), selectedDay.getMonth() + 1, 0);
  const numberOfDaysInMonth = new Date(
    selectedDay.getFullYear(),
    selectedDay.getMonth() + 1,
    0
  ).getDate();

  //   const wd = weekday[selectedDay.getDay()];
  //   const mt = month[selectedDay.getMonth()];
  console.log("d :", d);
  console.log("y :", y);

  console.log("selectedDay.getDay(): ", selectedDay.getDay());
  console.log("selectedDay.getMonth(): ", selectedDay.getMonth());

  const numberOfDaysInCard =
    numberOfDaysInMonth +
    firstDayOfMonth.getDay() +
    (6 - lastDayOfMonth.getDay());

  console.log("numberOfDaysInCard: ", numberOfDaysInCard);

  const dayToDisplayOnCard = fillDaysInMonthCard(
    firstDayOfMonth,
    numberOfDaysInMonth,
    lastDayOfMonth
  );
  console.log("dayToDisplayOnCard: ");
  console.log(dayToDisplayOnCard);
  return dayToDisplayOnCard;
}

function fillDaysInMonthCard(
  firstDayOfMonth,
  numberOfDaysInMonth,
  lastDayOfMonth
) {
  let dayToDisplayOnCard = [];
  for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
    dayToDisplayOnCard.push("-");
  }
  for (let i = 1; i < numberOfDaysInMonth + 1; i++) {
    dayToDisplayOnCard.push(i);
  }
  for (let i = 0; i < 6 - lastDayOfMonth.getDay(); i++) {
    dayToDisplayOnCard.push("-");
  }
  return dayToDisplayOnCard;
}

export default {
  daysInMonthCard,
};
