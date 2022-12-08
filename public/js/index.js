import status from "./request/getStatus.js";
import render from "./render/renderHTML.js";

const sourceWebsiteStatusEl = document.querySelector(
  "#source-website-status .alerts-grid"
);

async function init() {
  const webStatusData = await status.getWebStatus();

  webStatusData.forEach((web) => {
    sourceWebsiteStatusEl.insertAdjacentHTML(
      "beforeend",
      render.webStatus(web)
    );
  });
}

init();
