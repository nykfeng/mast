import animate from "../utilities/animation.js";

function disableTransactionBtns(specificBtn) {
  const btns = document.querySelectorAll(
    "#transaction-results .action-control button"
  );
  btns.forEach((btn) => {
    btn.disabled = true;
  });
  animate.disableTransactionBtns(btns);
  animate.disableCurrentBtnWithLoadingBar(specificBtn);
}

function enableTransactionBtns(specificBtn) {
  const btns = document.querySelectorAll(
    "#transaction-results .action-control button"
  );
  btns.forEach((btn) => {
    btn.disabled = false;
  });
  animate.enableTransactionBtns(btns);
  animate.enableCurrentBtnWithoutLoadingBar(specificBtn);
}

function updateSelectedDateOnBtnDescription(dateStr) {
  const btnDescriptionEls = document.querySelectorAll(
    ".action-control span.selected-date"
  );
  btnDescriptionEls.forEach((description) => {
    description.textContent = ": " + dateStr;
  });
}

export default {
  disableTransactionBtns,
  enableTransactionBtns,
  updateSelectedDateOnBtnDescription,
};
