import fetchAndCreate from "./utilities/create.js";
import listening from "./utilities/listeners.js";
import calendar from "./utilities/calendar.js";

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

  // results
  fetchAndCreate.calendarMonthCard();
}

function listeners() {
  listening.statusMinimizeAndMaximizeBtns();
  listening.statusRefreshBtns();
}


