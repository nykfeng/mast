const intervalIds = [];

function statusCheck(then, element, type) {
  intervalIds.push({
    [type]: setInterval(() => {
      const now = Date.now();
      const minuteDiff = (now - then) / 60000;
      element.innerHTML = Math.round(minuteDiff);
    }, 60000),
  });
}

function allowRefreshAgain(element) {
  setTimeout(() => {
    element.setAttribute("state", "to-refresh");
  }, 30000);
}

function clearingIntervals(type) {
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
  statusCheck,
  allowRefreshAgain,
  clearingIntervals,
};
