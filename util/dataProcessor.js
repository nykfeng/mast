// ===== date validation, day range must be today to max 10 days prior
// validate if input date is within 10 days
// this should be set up in middleware, so it doesn't have to pass over if the criteria
// is not met

// ===== news date string formatters
module.exports.newsDate = function (newsDateString) {
  // to store the date object converted from news piece data string
  let newsDate = null;

  // \b: This specifies a word boundary.
  // [0-9]{4}: This matches any four-digit number.
  // \b: This again specifies a word boundary.
  let fourDigitYearRegex = /\b[0-9]{4}\b/;
  let hourColonMinuteRegex = /\b([01]?[0-9]|2[0-3]):[0-5][0-9]\b/;
  let dayRegex =
    /\b(sun(day)?|mon(day)?|tue(s(day)?)?|wed(nesday)?|thu(rs(day)?)?|fri(day)?|sat(urday)?|(today)|(yesterday))\b/i;

  //  1) test if the date string contains a year number, if it does NOT
  if (!fourDigitYearRegex.test(newsDateString)) {
    //  1.1) test if the date string contains keywords like "today", "yesterday", "friday"
    if (dayRegex.test(newsDateString)) {
      newsDate = processDayToDateObject(newsDateString.toLowerCase());
      if (newsDate) return newsDate;
    }

    //  1.2) test if the date string contains hours: minutes
    else if (hourColonMinuteRegex.test(newsDateString)) {
      newsDate = processHourMinuteTimeString(newsDateString);
      if (newsDate) return newsDate;
    }
  }
  //  2) if it does contain full year, then we can try to interpret the date and convert to date object
  else {
    
  }

  return newsDate;
};

function processDayToDateObject(dayStr) {
  let date = null;
  let currentDay = date.getDay();

  // Example, if currentDay is 4 = Thursday, today's date is 12/29
  // a Monday would mean 3 days ago, so 1 - 4 = - 3
  // date.setDate(29-3) = 12/26

  // if today is sunday and today's date is 12/25, then currentDay = 0
  // a Monday would mean 6 days ago, so 0 < 1 ? 7 - 1 + 0 = 6
  // date.setDate(25-6) = 12/19
  switch (true) {
    case dayStr.includes("mon"):
      date = new Date();
      date.setDate(date.getDate() + dayDifferences(1, currentDay));
      break;
    case dayStr.includes("tue"):
      date = new Date();
      date.setDate(date.getDate() + dayDifferences(2, currentDay));
      break;
    case dayStr.includes("wed"):
      date = new Date();
      date.setDate(date.getDate() + dayDifferences(3, currentDay));
      break;
    case dayStr.includes("thu"):
      date = new Date();
      date.setDate(date.getDate() + dayDifferences(4, currentDay));
      break;
    case dayStr.includes("fri"):
      date = new Date();
      date.setDate(date.getDate() + dayDifferences(5, currentDay));
      break;
    case dayStr.includes("sat"):
      date = new Date();
      date.setDate(date.getDate() + dayDifferences(6, currentDay));
      break;
    case dayStr.includes("sun"):
      date = new Date();
      date.setDate(date.getDate() + -Math.abs(0 - currentDay));
      break;
    case dayStr.includes("today"):
      date = new Date();
      break;
    case dayStr.includes("yesterday"):
      date = new Date();
      date.setDate(date.getDate() - 1);
      break;
    default:
    // If the input keyword is not recognized, throw an error
    // throw new Error(`Invalid input: ${dayStr}`);
  }
  return date;
}

function dayDifferences(weekdayNumber, currentDayNumber) {
  return -Math.abs(
    currentDayNumber < weekdayNumber
      ? 7 - weekdayNumber + currentDayNumber
      : weekdayNumber - currentDayNumber
  );
}

function processHourMinuteTimeString(timeStr) {
  // Get the current date
  const today = new Date();

  const sanitizedTimeStr = timeStr.replace(/[a-zA-Z]/g, "").trim();

  // Get the year, month, and day of the current date
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  // Parse the time string and create a date object for today's date
  const date = new Date(`${year}-${month + 1}-${day}T${sanitizedTimeStr}`);

  return date;
}

// ===== news title string formatter
module.exports.newsTitle = function (newsTitleString) {
  // remove \t \n empty space trim, etc. other html tag
  // return newsTitleCleansed;
};

//
