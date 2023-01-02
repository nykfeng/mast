function errorScraperDateRange(msg, dateStr1, dateStr2) {
  // Create the first p element
  const p1 = document.createElement("p");
  p1.textContent = msg;

  // Create the second p element
  const p2 = document.createElement("p");
  p2.textContent = "From: ";

  // Create the first span element for lower bound date
  const span1 = document.createElement("span");
  span1.textContent = dateStr1;
  span1.classList.add("date-lower-bound", "date-range");

  // Create the second span element for upper bound date
  const span2 = document.createElement("span");
  span2.textContent = dateStr2;
  span2.classList.add("date-upper-bound", "date-range");

  // Append the span elements to the second p element
  p2.appendChild(span1);
  p2.appendChild(document.createTextNode(" to "));
  p2.appendChild(span2);

  return [p1, p2];
}

function errorTitle(msg) {
  const p = document.createElement("p");
  p.classList.add("title-msg");
  p.textContent = "Error: " + msg;
  return p;
}

export default {
  errorTitle,
  errorScraperDateRange,
};
