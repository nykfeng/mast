function toCollapseContainer(el) {
  // container background
  const toBeCallapedEl = el
    .closest(".content-container")
    .querySelector(".container-collapsible");

  // container timer element
  const toBeHiddenEl = toBeCallapedEl
    .closest(".content-container")
    .querySelector(".status-updated-time");

  toBeCallapedEl.setAttribute("state", "collpased");

  if (toBeHiddenEl) {
    toBeHiddenEl.style.display = "none";
  }
  setTimeout(() => {
    toBeCallapedEl.style.display = "none";
  }, 250);
}

function toExpandContainer(el) {
  // container background
  const toBeExpandedEl = el
    .closest(".content-container")
    .querySelector(".container-collapsible");

  // container timer element
  const toBeUnhiddenEl = toBeExpandedEl
    .closest(".content-container")
    .querySelector(".status-updated-time");
  if (toBeUnhiddenEl) {
    toBeUnhiddenEl.style.display = "flex";
  }

  toBeExpandedEl.setAttribute("state", "expanded");
  toBeExpandedEl.style.display = "flex";
}

function removeCalendarDayAndMonthSelectors() {
  const monthCardEl = document.querySelector("#calendar .month");
  const weekdayRowEls = monthCardEl.querySelectorAll(".weekday");
  const monthSelectorRowEl = monthCardEl.querySelector(".month-selector");
  weekdayRowEls.forEach((row) => {
    row.remove();
  });
  monthSelectorRowEl.remove();
}

function highlightSelectedDate(cellDate) {
  const weekdayCellEls = document.querySelectorAll(".weekday span");
  weekdayCellEls.forEach((day) => {
    if (day.getAttribute("localdate") === cellDate) {
      day.setAttribute("selected", "true");
    }
  });
}

function disableTransactionBtns(btns) {
  btns.forEach((btn) => {
    btn.style.cursor = "wait";
    btn.parentElement.setAttribute("state", "inactive");
  });
}

function enableTransactionBtns(btns) {
  btns.forEach((btn) => {
    btn.style.cursor = "pointer";
    btn.parentElement.setAttribute("state", "active");
  });
}

function disableCurrentBtnWithLoadingBar(btn) {
  btn.style.display = "none";
  btn.parentElement.style.display = "none";
  const loadingBarEl = btn
    .closest(".btn-container")
    .querySelector(".loading-bar");
  loadingBarEl.setAttribute("state", "active");
}

function enableCurrentBtnWithoutLoadingBar(btn) {
  btn.style.display = "block";
  btn.parentElement.style.display = "flex";
  const loadingBarEl = btn
    .closest(".btn-container")
    .querySelector(".loading-bar");
  loadingBarEl.setAttribute("state", "inactive");
}

function removeConsoleContent() {
  const consoleBodyEl = document.querySelector("#console .console-body");
  while (consoleBodyEl.firstChild) {
    consoleBodyEl.removeChild(consoleBodyEl.firstChild);
  }
}

export default {
  toCollapseContainer,
  toExpandContainer,
  removeCalendarDayAndMonthSelectors,
  highlightSelectedDate,
  disableTransactionBtns,
  enableTransactionBtns,
  disableCurrentBtnWithLoadingBar,
  enableCurrentBtnWithoutLoadingBar,
  removeConsoleContent,
};
