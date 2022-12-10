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

export default {
  intervalIds,
  statusCheckElapsed,
  allowRefreshAgain,
  clearingSetIntervals,
};
