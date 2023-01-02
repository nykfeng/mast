const intervalIds = [];

function statusCheckElapsed(then, timeElapsedElement, type) {
  intervalIds.push({
    [type]: setInterval(() => {
      const now = Date.now();
      const minuteDiff = (now - then) / 60000;
      timeElapsedElement.innerHTML = Math.round(minuteDiff);
    }, 60000),
  });
}

function allowRefreshAgain(refreshBtnElement) {
  setTimeout(() => {
    refreshBtnElement.setAttribute("state", "to-refresh");
    refreshBtnElement.children[0].setAttribute("allow-spin", false);
  }, 30000);
}

function clearingSetIntervals(type) {
  intervalIds.forEach((id) => {
    // Eg. if id.webStatus
    // clearInterval(id.webStatus)
    if (id[type]) {
      clearInterval(id[type]);
    }
  });
}

function waitFor(milliseconds = 3000) {
  return new Promise((r) => setTimeout(r, milliseconds));
}

export default {
  intervalIds,
  statusCheckElapsed,
  allowRefreshAgain,
  clearingSetIntervals,
  waitFor,
};
