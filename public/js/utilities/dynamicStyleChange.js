function adjustDateHeightToMonthCard() {
  const monthCardEl = document.querySelector("#calendar .month");
  const dateCardEl = document.querySelector("#calendar .date");

  const monthCardHeight = window
    .getComputedStyle(monthCardEl)
    .height.replace("px", "");
  const dateCardHeight = parseInt(monthCardHeight) * 1.18;

  dateCardEl.style.height = dateCardHeight + "px";
}

export default {
  adjustDateHeightToMonthCard,
};
