import calendar from "./calendar.js";

function date(dateStr) {
  // date should be within the last 7 days
  // website don't store all information on live site

  const date = new Date();
  const selectedDate = new Date(dateStr);

  // will not run on future date
  // if (selectedDate - date > 0) return false;

  // test if the date is within the last 7 days

  // Get the current time in milliseconds
  const currentTime = date.getTime();

  // Get the number of milliseconds in 7 days
  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  if (
    selectedDate - date <= 0 &&
    selectedDate.getTime() > currentTime - oneWeek
  ) {
    return true;
  } else {
    // Trigger an error modal
    const date7DaysAgo = new Date();
    // excluding today, so it should be 6 days past
    date7DaysAgo.setDate(date.getDate() - 6);

    const dateStr1 = calendar.getMMDDYYYY(date7DaysAgo);
    const dateStr2 = calendar.getMMDDYYYY(date);

    const errorModalEvent = new CustomEvent("error-modal", {
      detail: {
        title: "Date range out of bound",
        message:
          "When running the scraper, date should be within the last 7 days.",
        dateRangeFrom: dateStr1,
        dateRangeTo: dateStr2,
        type: "date out of bound",
      },
    });
    window.dispatchEvent(errorModalEvent);

    return false;
  }
}

export default {
  date,
};
