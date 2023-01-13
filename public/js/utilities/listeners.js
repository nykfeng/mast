import timer from "./timer.js";
import fetching from "./create.js";
import { updateCalendar } from "./create.js";
import { createTransactionList } from "./create.js";
import { createErrorModal } from "./create.js";
import { createConsole } from "./create.js";
import animate from "./animation.js";
import state from "../state/state.js";
import validate from "./validate.js";
import renderDownload from "../render/renderDownload.js";
import { wsConnect } from "../state/wsConnection.js";

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

// calendar day click
function calendarDayClick() {
  const monthCardEl = document.querySelector("#calendar .month");
  const weekdayCellEls = monthCardEl.querySelectorAll(".weekday span");

  weekdayCellEls.forEach((cell) => {
    cell.addEventListener("click", () => {
      const cellDateStr = cell.getAttribute("localdate");
      const selectedDate = new Date(cellDateStr);
      animate.removeCalendarDayAndMonthSelectors();
      updateCalendar(selectedDate);
      animate.highlightSelectedDate(cellDateStr);
      state.updateSelectedDateOnBtnDescription(cellDateStr);
      calendarDayClick();
      calendarPrevNextBtns();
    });
  });
}

function calendarPrevNextBtns() {
  const prevBtn = document.querySelector(
    "#calendar .month-selector .prev-month"
  );
  const nextBtn = document.querySelector(
    "#calendar .month-selector .next-month"
  );

  [prevBtn, nextBtn].forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedDate = new Date(btn.getAttribute("month"));
      const btnDateStr = btn.getAttribute("month");
      animate.removeCalendarDayAndMonthSelectors();
      updateCalendar(selectedDate);
      animate.highlightSelectedDate(btnDateStr);
      state.updateSelectedDateOnBtnDescription(btnDateStr);
      calendarDayClick();
      calendarPrevNextBtns();
    });
  });
}

function runScraperBtn() {
  const runBtn = document.querySelector(
    "#transaction-results button.run-scraper"
  );
  runBtn.addEventListener("click", async () => {
    const dateEl = document.querySelector("#calendar .date");
    const currentDateStr = dateEl.getAttribute("date");

    // if the date is not validated, stop
    if (!validate.date(currentDateStr)) return;

    // open console
    createConsole();
    // connect websocket and to display console text
    wsConnect();

    // otherwise, run scraper and disable other buttons
    state.disableTransactionBtns(runBtn);
    const data = await fetching.scraper(currentDateStr);
    // create the list of transaction
    createTransactionList(data);
    state.enableTransactionBtns(runBtn);
  });
}

function downloadResultBtn() {
  const downloadBtn = document.querySelector(
    "#transaction-results button.download"
  );

  downloadBtn.addEventListener("click", async () => {
    // if there are no results yet, no download
    const resultListEl = document.querySelector("ul.display-results-list");
    if (!resultListEl.hasChildNodes()) return;

    // get the date of the transactions
    let dateStr = document
      .querySelector("#calendar .date")
      .getAttribute("date");
    dateStr = dateStr.replaceAll("/", "-");

    // if there are results to download
    state.disableTransactionBtns(downloadBtn);
    const { dataToBeDownloaded } = renderDownload.getDataToBeDownloaded();
    renderDownload.transactionResult(
      dataToBeDownloaded,
      `Transaction List ${dateStr}.csv`,
      "text/csv"
    );
    state.enableTransactionBtns(downloadBtn);
  });
}

function modalOpen() {
  window.addEventListener("error-modal", (event) => {
    createErrorModal(event);
  });
}

function modalClose() {
  const modalEl = document.getElementById("modal");
  window.onclick = function (event) {
    if (event.target == modalEl) {
      modalEl.style.display = "none";
    }
  };

  const modalTitleCloseEl = document.querySelector("#modal .cross-close-btn");
  const modalFooterCloseBtn = document.querySelector("#modal .close-modal-btn");

  [modalTitleCloseEl, modalFooterCloseBtn].forEach((btn) => {
    btn.addEventListener("click", () => {
      modalEl.style.display = "none";
    });
  });
}

export default {
  statusMinimizeAndMaximizeBtns,
  statusRefreshBtns,
  calendarDayClick,
  calendarPrevNextBtns,
  runScraperBtn,
  downloadResultBtn,
  modalOpen,
  modalClose,
};
