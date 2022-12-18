import timer from "./timer.js";
import fetching from "./create.js";
import animate from "./animation.js";

// status bar minimize and maximize buttons
function statusMinimizeAndMaximizeBtns() {
  const minMaxBtns = document.querySelectorAll(
    ".content-container button.min-max"
  );
  minMaxBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.getAttribute("state") === "to-min") {
        btn.setAttribute("state", "to-max");
        animate.toCollapseContainer(btn);
      } else {
        btn.setAttribute("state", "to-min");
        animate.toExpandContainer(btn);
      }
    });
  });
}

// status bar refresh buttons
function statusRefreshBtns() {
  const refreshBtns = document.querySelectorAll(
    ".content-container button.refresh"
  );
  refreshBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (btn.getAttribute("state") === "to-refresh") {
        btn.setAttribute("state", "refreshed");
        btn.querySelector("svg").setAttribute("allow-spin", "false");
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
