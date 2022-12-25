import getStatus from "../request/getStatus.js";
import getStats from "../request/getStatistics.js";
import render from "../render/renderHTML.js";
import timer from "./timer.js";
import calendar from "./calendar.js";
import style from "./dynamicStyleChange.js";
import animate from "./animation.js";

async function webStatus() {
  const sourceWebsiteStatusEl = document.querySelector(
    "#source-website-status .alerts-grid"
  );
  // remove children if there are any
  while (sourceWebsiteStatusEl.hasChildNodes()) {
    sourceWebsiteStatusEl.removeChild(sourceWebsiteStatusEl.childNodes[0]);
  }

  // getting source website status from server
  const webStatusData = await getStatus.webStatus();

  // stop refresh icon spinning
  sourceWebsiteStatusEl
    .closest(".content-container")
    .querySelector("button.refresh svg")
    .setAttribute("allow-spin", "true");

  // updating these status as HTML
  webStatusData.forEach((web) => {
    sourceWebsiteStatusEl.insertAdjacentHTML(
      "beforeend",
      render.webStatus(web)
    );
  });

  // set timer for time lapse since this update
  const webStatusUpdateMinuteEl = document.querySelector(
    "#source-website-status .status-updated-time .minute"
  );
  // set current time lapse to 0
  webStatusUpdateMinuteEl.innerHTML = 0;

  // Check if there are previous intervals, clear them all
  timer.clearingSetIntervals("webStatus");

  const statusTimer = Date.now();
  timer.statusCheckElapsed(statusTimer, webStatusUpdateMinuteEl, "webStatus");
}

async function systemStatus() {
  // get system update status code
  // =============================

  // set timer for time lapse since this update
  const systemStatusUpdateMinuteEl = document.querySelector(
    "#system-status .status-updated-time .minute"
  );
  systemStatusUpdateMinuteEl.innerHTML = 0;

  // Check if there are previous intervals, clear them all
  timer.clearingSetIntervals("systemStatus");

  const statusTimer = Date.now();
  timer.statusCheckElapsed(
    statusTimer,
    systemStatusUpdateMinuteEl,
    "systemStatus"
  );
}

async function graphStatsDailyTransactionNumber() {
  // getting transaction number from server
  const dailyTransactionNumberData =
    await getStats.graphStatsDailyTransactionNumber();
}

function calendarMonthCard(selectedDate = new Date()) {
  const monthCardEl = document.querySelector("#calendar .month");
  const monthCardData = calendar.daysInMonthCard(selectedDate);
  const numberOfRows = Math.ceil(monthCardData.length / 7);
  for (let i = 0; i < numberOfRows; i++) {
    monthCardEl.insertAdjacentHTML(
      "beforeend",
      render.calendarWeek(monthCardData, i)
    );
  }
  monthCardEl.insertAdjacentHTML(
    "beforeend",
    render.calendarMonthSelectorRow(
      selectedDate,
      calendar.monthString(selectedDate)
    )
  );
  animate.highlightSelectedDate(
    selectedDate.getMonth() +
      1 +
      "/" +
      selectedDate.getDate() +
      "/" +
      selectedDate.getFullYear()
  );
}

function calendarDateCard(selectedDate = new Date()) {
  const dateEl = document.querySelector("#calendar .date");
  const monthTextEl = dateEl.querySelector("#monthName");
  const dayTextEl = dateEl.querySelector("#day");
  const weekdayTextEl = dateEl.querySelector("#weekdayName");
  const yearTextEl = dateEl.querySelector("#year");

  monthTextEl.textContent = calendar.textInDateCard(selectedDate).monthName;
  weekdayTextEl.textContent = calendar.textInDateCard(selectedDate).weekdayName;
  dayTextEl.textContent = calendar.textInDateCard(selectedDate).d;
  yearTextEl.textContent = calendar.textInDateCard(selectedDate).y;

  style.adjustDateHeightToMonthCard();
}

export function updateCalendar(selectedDate) {
  calendarMonthCard(selectedDate);
  calendarDateCard(selectedDate);
}

export default {
  webStatus,
  systemStatus,
  graphStatsDailyTransactionNumber,
  calendarMonthCard,
  calendarDateCard,
  updateCalendar,
};
