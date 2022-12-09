import timer from "./timer.js";
import fetching from "./create.js";

// status bar minimize and maximize buttons
function statusMinimizeAndMaximizeBtns() {
  const minMaxBtns = document.querySelectorAll(
    ".status-container button.min-max"
  );
  minMaxBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.getAttribute("state") === "to-min") {
        btn.setAttribute("state", "to-max");
        const toBeCallapedEl = btn.nextElementSibling;
        const toBeHiddenEl = toBeCallapedEl.nextElementSibling;
        toBeCallapedEl.setAttribute("state", "collpased");
        toBeHiddenEl.style.display = "none";
        setTimeout(() => {
          toBeCallapedEl.style.display = "none";
        }, 250);
      } else {
        btn.setAttribute("state", "to-min");
        const toBeExpandedEl = btn.nextElementSibling;
        const toBeUnhiddenEl = toBeExpandedEl.nextElementSibling;
        toBeUnhiddenEl.style.display = "flex";
        toBeExpandedEl.style.display = "flex";
        toBeExpandedEl.setAttribute("state", "expanded");
      }
    });
  });
}

// status bar refresh buttons
function statusRefreshBtns() {
  const refreshBtns = document.querySelectorAll(
    ".status-container button.refresh"
  );
  refreshBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (btn.getAttribute("state") === "to-refresh") {
        btn.setAttribute("state", "refreshed");
        if (btn.getAttribute("type") === "website-status") {
          await fetching.webStatus();
          // cannot re-refresh again until 30 seconds later
          // prevent continuous requests to server via btn clicking
          timer.allowRefreshAgain(btn);
        }
      }
    });
  });
}

export default {
  statusMinimizeAndMaximizeBtns,
  statusRefreshBtns,
};
