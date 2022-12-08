import status from "./request/getStatus.js";
import render from "./render/renderHTML.js";
import timer from "./utilities/timer.js";

const sourceWebsiteStatusEl = document.querySelector(
  "#source-website-status .alerts-grid"
);
const webStatusUpdateMinuteEl = document.querySelector(
  "#source-website-status .status-updated-time .minute"
);

async function init() {
  const webStatusData = await status.getWebStatus();
  const webStatusTimer = Date.now();

  timer.webStatus(webStatusTimer, webStatusUpdateMinuteEl)
  webStatusData.forEach((web) => {
    sourceWebsiteStatusEl.insertAdjacentHTML(
      "beforeend",
      render.webStatus(web)
    );
  });
}

init();
