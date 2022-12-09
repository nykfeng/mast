import fetchAndCreate from "./utilities/create.js";
import listening from "./utilities/listeners.js";

async function init() {
  await initialDataFetchAndCreate();
  listeners();
}

init();

async function initialDataFetchAndCreate() {
  await fetchAndCreate.webStatus();
  await fetchAndCreate.systemStatus();
}

function listeners() {
  listening.statusMinimizeAndMaximizeBtns();
  listening.statusRefreshBtns();
}
