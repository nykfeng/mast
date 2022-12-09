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

  timer.webStatus(webStatusTimer, webStatusUpdateMinuteEl);
  webStatusData.forEach((web) => {
    sourceWebsiteStatusEl.insertAdjacentHTML(
      "beforeend",
      render.webStatus(web)
    );
  });

  listeners();
}

init();

function listeners() {
  const minMaxBtn = document.querySelectorAll("button.min-max");

  minMaxBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.getAttribute("state") === "to-min") {
        btn.setAttribute("state", "to-max");
        const parentEl = btn.parentElement;
        const toBeCallapedEl = btn.nextElementSibling;
        const toBeHiddenEl = toBeCallapedEl.nextElementSibling;
        toBeCallapedEl.setAttribute("state", "collpased");
        toBeHiddenEl.style.display = "none";
        parentEl.style.height = "40px";
        setTimeout(() => {
          toBeCallapedEl.style.display = "none";
        }, 250);
      } else {
        btn.setAttribute("state", "to-min");
        const parentEl = btn.parentElement;
        const toBeExpandedEl = btn.nextElementSibling;
        const toBeUnhiddenEl = toBeExpandedEl.nextElementSibling;
        toBeUnhiddenEl.style.display = "flex";
        toBeExpandedEl.style.display = "flex";
        parentEl.style.height = "auto";
        toBeExpandedEl.setAttribute("state", "expanded");
      }
    });
  });
}
