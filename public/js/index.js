import fetchAndCreate from "./utilities/create.js";
import listening from "./utilities/listeners.js";

async function init() {
  await initialDataFetchAndCreate();
  listeners();
}

init();

async function initialDataFetchAndCreate() {
  // status
  await fetchAndCreate.webStatus();
  await fetchAndCreate.systemStatus();

  // stats
  await fetchAndCreate.graphStatsDailyTransactionNumber();

  // results section
  fetchAndCreate.calendarMonthCard();
  fetchAndCreate.calendarDateCard();
}

function listeners() {
  listening.statusMinimizeAndMaximizeBtns();
  listening.statusRefreshBtns();

  // calendar
  listening.calendarDayClick();
  listening.calendarPrevNextBtns();

  listening.runScraperBtn();
  listening.downloadResultBtn();

  listening.modalOpen();
  listening.modalClose();
}
