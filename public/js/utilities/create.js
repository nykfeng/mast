import get from "../request/getStatus.js";
import render from "../render/renderHTML.js";
import timer from "./timer.js";

async function webStatus() {
  const sourceWebsiteStatusEl = document.querySelector(
    "#source-website-status .alerts-grid"
  );
  // remove children if there are any
  while (sourceWebsiteStatusEl.hasChildNodes()) {
    sourceWebsiteStatusEl.removeChild(sourceWebsiteStatusEl.childNodes[0]);
  }

  // getting source website status from server
  const webStatusData = await get.webStatus();
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
  timer.clearingSetIntervals("webStatus")

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
  timer.clearingSetIntervals("systemStatus")

  const statusTimer = Date.now();
  timer.statusCheckElapsed(statusTimer, systemStatusUpdateMinuteEl, "systemStatus");
}
export default {
  webStatus,
  systemStatus,
};
