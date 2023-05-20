import fetchAndCreate from "./utilities/create.js";
import listening from "./utilities/listeners.js";

async function init() {
  await initialDataFetchAndCreate();
  listeners();
}

init();

async function initialDataFetchAndCreate() {
  // status
  // await fetchAndCreate.webStatus();
  await fetchAndCreate.systemStatus();

  // stats
  await fetchAndCreate.graphStatsDailyTransactionNumber();

  // graphs
  fetchAndCreate.dailyTransactionGraph();
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

  // transaction results section
  listening.runScraperBtn();
  listening.fetchResultsFromDbBtn();
  listening.downloadResultBtn();

  listening.modalOpen();
  listening.modalClose();
}
