import getStatus from "../request/getStatus.js";
import getStats from "../request/getStatistics.js";
import getResults from "../request/getResults.js";
import render from "../render/renderHTML.js";
import renderModal from "../render/renderModal.js";
import renderGraph from "../render/renderGraph.js";
import renderDownload from "../render/renderDownload.js";
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
  animate.highlightSelectedDate(calendar.getMMDDYYYY(selectedDate));
}

function calendarDateCard(selectedDate = new Date()) {
  const dateEl = document.querySelector("#calendar .date");
  const monthTextEl = dateEl.querySelector("#monthName");
  const dayTextEl = dateEl.querySelector("#day");
  const weekdayTextEl = dateEl.querySelector("#weekdayName");
  const yearTextEl = dateEl.querySelector("#year");

  dateEl.setAttribute("date", calendar.getMMDDYYYY(selectedDate));
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

async function scraper(dateStr) {
  if (!dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)) {
    console.log("Date string error");
    return;
  }
  const queryStr = "?date=" + dateStr;
  const data = await getResults.transactionResults(queryStr);
  renderDownload.storeDataToBeDownloaded(data, dateStr);
  return data;
}

export function createTransactionList(data) {
  //remove current transaction list, if any
  const transactionListEl = document.querySelector(".display-results-list");
  transactionListEl.innerHTML = "";

  // render each element on the list
  data.forEach((transaction) => {
    transaction.date = calendar.getMMDDYYYY(new Date(transaction.date));
    transactionListEl.insertAdjacentHTML(
      "beforeend",
      render.transactionResultListItem(transaction)
    );
  });
}

export function createTransactionSummary(data) {
  const displayResultEl = document.querySelector(".display-results");
  const resultsSummaryTable = document.querySelector(".results-summary-table");
  let summaryData = {};

  // remove table if it already exists from previous run
  if (resultsSummaryTable) {
    resultsSummaryTable.remove();
  }

  data.forEach((transaction) => {
    if (!summaryData[transaction.hostName]) {
      summaryData[transaction.hostName] = 1;
    } else {
      summaryData[transaction.hostName]++;
    }
  });

  displayResultEl.insertAdjacentHTML(
    "afterbegin",
    render.transactionSummaryTable(summaryData)
  );
}

export function createErrorModal(event) {
  const { title, message, dateRangeFrom, dateRangeTo } = event.detail;

  const modalEl = document.getElementById("modal");
  modalEl.style.display = "flex";

  const modalTitleEl = modalEl.querySelector(".modal-title");
  // remove the title message if there is any
  modalTitleEl.children[0].classList.contains("title-msg")
    ? modalTitleEl.children[0].remove()
    : "";
  modalTitleEl.prepend(renderModal.errorTitle(title));

  const modalDetailEl = modalEl.querySelector(".modal-detail");
  // remove the modal body details, if there is any
  modalDetailEl.innerHTML = "";
  modalDetailEl.append(
    ...renderModal.errorScraperDateRange(message, dateRangeFrom, dateRangeTo)
  );
}

export function createConsole() {
  const consoleEl = document.querySelector("#console");
  consoleEl.style.display = "block";
}

export function updateConsoleContent(msgOrigin, textLine) {
  const consoleBodyEl = document.querySelector("#console .console-body");

  // remove the cursor from the last p element in console body
  const lastParagraphEl = consoleBodyEl.querySelector("p:last-child");
  if (lastParagraphEl) {
    const lastCursorSpan = lastParagraphEl.lastElementChild;
    lastCursorSpan.remove();
  }

  const msgOriginSpan = document.createElement("span");
  msgOriginSpan.textContent = msgOrigin;
  msgOriginSpan.classList.add("msg-origin");

  const cursorSpan = document.createElement("span");
  cursorSpan.textContent = "|";
  cursorSpan.classList.add("cursor");

  // create the new paragraph element and add its content
  const currentParagraphEl = document.createElement("p");
  currentParagraphEl.appendChild(msgOriginSpan);
  currentParagraphEl.appendChild(document.createTextNode(textLine));
  currentParagraphEl.appendChild(cursorSpan);

  // add it to the console body
  consoleBodyEl.append(currentParagraphEl);

  // scroll to the bottom within the div
  consoleBodyEl.scrollTop = consoleBodyEl.scrollHeight;
}

async function dailyTransactionGraph() {
  const dailyTransactionNumberData =
    await getStats.graphStatsDailyTransactionNumber();
  renderGraph.dailyTransaction(dailyTransactionNumberData);
}

export default {
  webStatus,
  systemStatus,
  graphStatsDailyTransactionNumber,
  dailyTransactionGraph,
  calendarMonthCard,
  calendarDateCard,
  scraper,
  createErrorModal,
  createConsole,
  updateConsoleContent,
};
