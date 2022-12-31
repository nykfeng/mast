// ===== date validation, day range must be today to max 10 days prior
// validate if input date is within 10 days
// this should be set up in middleware, so it doesn't have to pass over if the criteria
// is not met

// ===== news date string formatters
module.exports.newsDate = function (newsDateString) {
  // to store the date object converted from news piece data string
  let newsDate = null;
  newsDateString = newsDateString.toLowerCase();

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
      newsDate = processDayToDateObject(newsDateString);
      if (newsDate) return newsDate;
    }

    //  1.2) test if the date string contains just hours:minutes like "16:45 ET"
    else if (hourColonMinuteRegex.test(newsDateString)) {
      newsDate = processHourMinuteTimeString(newsDateString);
      if (newsDate) return newsDate;
    }
  }
  //  2) if it does contain full year, then we can try to interpret the date and convert to date object
  else {
    newsDate = processFullDateString(newsDateString);
    if (newsDate) return newsDate;
  }

  return newsDate;
};

function processDayToDateObject(dayStr) {
  let date = null;

  // Example, if currentDay is 4 = Thursday, today's date is 12/29
  // a Monday would mean 3 days ago, so 1 - 4 = - 3
  // date.setDate(29-3) = 12/26

  // if today is sunday and today's date is 12/25, then currentDay = 0
  // a Monday would mean 6 days ago, so 0 < 1 ? 7 - 1 + 0 = 6
  // date.setDate(25-6) = 12/19
  switch (true) {
    case dayStr.includes("mon"):
      date = setDate(1); // 1 is monday, which is date.getDay()'s value
      break;
    case dayStr.includes("tue"):
      date = setDate(2);
      break;
    case dayStr.includes("wed"):
      date = setDate(3);
      break;
    case dayStr.includes("thu"):
      date = setDate(4);
      break;
    case dayStr.includes("fri"):
      date = setDate(5);
      break;
    case dayStr.includes("sat"):
      date = setDate(6);
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

function setDate(weekdayNumber) {
  const date = new Date();
  const currentDay = date.getDay();

  // set the date object to be the date of the input day, like the past "monday" date
  date.setDate(date.getDate() + dayDifferences(weekdayNumber, currentDay));

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

function processFullDateString(dateStr) {
  // need to sanitize time zone for the Date object to work
  // Example date string inputs
  // 1) 'Dec 27, 2022, 09:15 ET'
  // 2) '2022-12-22T12:49:00Z'
  // 3) 'December 29, 2022 17:00 ET'

  // Remove the letters at the end and after the last space
  const sanitizedDateStr = dateStr.replace(/\s*[a-zA-Z]*$/, "").trim();
  // The regular expression /\s*[a-zA-Z]*$/ will match zero or more spaces followed by zero or more letters at the end of the string.
  // the 's' character is used to match any white space character, including the space, tab, and newline characters.
  // the '*' character is a quantifier that indicates that the preceding character or group of characters should be matched zero or more times.

  return new Date(sanitizedDateStr);
}

// ===== news title string formatter
module.exports.newsTitle = function (newsTitleString) {
  // remove \t \n empty space trim, etc. other html tag
  // return newsTitleCleansed;
};

//
