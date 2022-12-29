// ===== date validation, day range must be today to max 10 days prior
// validate if input date is within 10 days
// this should be set up in middleware, so it doesn't have to pass over if the criteria
// is not met

// ===== news date string formatters
module.exports.newsDate = function (newsDateString) {
  // to store the date object converted from news piece data string
  let newsDate = new Date();

  //   1) test if the date string contains a year number
  let fourDigitYearRegex = /\b[0-9]{4}\b/;
  let hourColonMinuteRegex = /\b([01]?[0-9]|2[0-3]):[0-5][0-9]\b/;
  let dayRegex =
    /\b(sun(day)?|mon(day)?|tue(s(day)?)?|wed(nesday)?|thu(rs(day)?)?|fri(day)?|sat(urday)?|(today)|(yesterday))\b/i;
  // \b: This specifies a word boundary.
  // [0-9]{4}: This matches any four-digit number.
  // \b: This again specifies a word boundary.

  if (!fourDigitYearRegex.test(newsDateString)) {
    // 2) test if the date string contains keywords like "today", "yesterday", "friday"
    if (dayRegex.test(newsDateString)) {
      newsDate = processDayToDateObject(newsDateString.toLowerCase());
    }

    // 3) test if the date string contains hours: minutes
    if (hourColonMinuteRegex.test(newsDateString)) {
    } else {
    }
  }

  return newsDate;
};

function processDayToDateObject(dayStr) {
  let date = new Date();
  let currentDay = date.getDay();

  // Example, if currentDay is 4 = Thursday, today's date is 12/29
  // a Monday would mean 3 days ago, so 1 - 4 = - 3
  // date.setDate(29-3) = 12/26

  // if today is sunday and today's date is 12/25, then currentDay = 0
  // a Monday would mean 6 days ago, so 0 < 1 ? 7 - 1 + 0 = 6
  // date.setDate(25-6) = 12/19
  switch (true) {
    case dayStr.includes("mon"):
      date.setDate(
        date.getDate() +
          -Math.abs(currentDay < 1 ? 7 - 1 + currentDay : 1 - currentDay)
      );
      break;
    case dayStr.includes("tue"):
      date.setDate(
        date.getDate() +
          -Math.abs(currentDay < 2 ? 7 - 2 + currentDay : 2 - currentDay)
      );
      break;
    case dayStr.includes("wed"):
      date.setDate(
        date.getDate() +
          -Math.abs(currentDay < 3 ? 7 - 3 + currentDay : 3 - currentDay)
      );
      break;
    case dayStr.includes("thu"):
      date.setDate(
        date.getDate() +
          -Math.abs(currentDay < 4 ? 7 - 4 + currentDay : 4 - currentDay)
      );
      break;
    case dayStr.includes("fri"):
      date.setDate(
        date.getDate() +
          -Math.abs(currentDay < 5 ? 7 - 5 + currentDay : 5 - currentDay)
      );
      break;
    case dayStr.includes("sat"):
      date.setDate(
        date.getDate() +
          -Math.abs(currentDay < 6 ? 7 - 6 + currentDay : 6 - currentDay)
      );
      break;
    case dayStr.includes("sun"):
      date.setDate(date.getDate() + -Math.abs(0 - currentDay));
      break;
    case dayStr.includes("today"):
      break;
    case dayStr.includes("yesterday"):
      date.setDate(date.getDate() - 1);
      break;
    default:
      // If the input keyword is not recognized, throw an error
      throw new Error(`Invalid input: ${dayStr}`);
  }
  return date;
}

// ===== news title string formatter
module.exports.newsTitle = function (newsTitleString) {
  // remove \t \n empty space trim, etc. other html tag
  // return newsTitleCleansed;
};

//
