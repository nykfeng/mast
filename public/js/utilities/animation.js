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
  toBeHiddenEl.style.display = "none";
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
  toBeUnhiddenEl.style.display = "flex";
  toBeExpandedEl.style.display = "flex";
  toBeExpandedEl.setAttribute("state", "expanded");
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

export default {
  toCollapseContainer,
  toExpandContainer,
  removeCalendarDayAndMonthSelectors,
  highlightSelectedDate
};
