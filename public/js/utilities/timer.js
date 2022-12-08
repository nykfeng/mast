function webStatus(then, element) {
  setInterval(() => {
    const now = Date.now();
    const minuteDiff = (now - then) / 60000;
    element.innerHTML = Math.ceil(minuteDiff);
  }, 60000);
}

export default {
  webStatus,
};
