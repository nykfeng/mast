module.exports.waitFor = (milliseconds = 3000) => {
  return new Promise((r) => setTimeout(r, milliseconds));
};
