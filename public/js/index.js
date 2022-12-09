import fetching from "./utilities/create.js";
import listening from "./utilities/listeners.js";

async function init() {
  await initialDataFetch();
  listeners();
}

init();

async function initialDataFetch() {
  await fetching.webStatus();
  await fetching.systemStatus();
}

function listeners() {
  listening.statusMinimizeAndMaximizeBtns();
  listening.statusRefreshBtns();
}
