import status from "./request/getStatus.js";
import render from "./render/renderHTML.js";
import timer from "./utilities/timer.js";
import create from "./utilities/create.js";

async function init() {
  await initialDataFetch();
  listeners();
}

init();

function listeners() {
  // status bar minimize and maximize button
  const minMaxBtns = document.querySelectorAll(
    ".status-container button.min-max"
  );
  minMaxBtns.forEach((btn) => {
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

  // status bar refresh button
  const refreshBtns = document.querySelectorAll(
    ".status-container button.refresh"
  );
  refreshBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (btn.getAttribute("state") === "to-refresh") {
        btn.setAttribute("state", "refreshed");
        if (btn.getAttribute("type") === "website-status") {
          await create.webStatus();
          timer.allowRefreshAgain(btn);
        }
      }
    });
  });
}

async function initialDataFetch() {
  await create.webStatus();
  await create.systemStatus();
}
