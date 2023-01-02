function date(dateStr) {
  // date should be within the last 7 days
  // website don't store all information on live site

  const date = new Date();
  const selectedDate = new Date(dateStr);

  // will not run on future date
  if (selectedDate - date > 0) return false;

  // test if the date is within the last 7 days

  // Get the current time in milliseconds
  const currentTime = date.getTime();

  // Get the number of milliseconds in 7 days
  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  if (selectedDate.getTime() > currentTime - oneWeek) {
    return true;
  } else {
    // set an error modal
    const errorModalEvent = new CustomEvent("error-modal", {
      detail: {
        message: "Date range out of bound",
      },
    });
    window.dispatchEvent(errorModalEvent);

    return false;
  }
}

export default {
  date,
};
