function webStatus(website) {
  const html = `
    <div class="alert" site="${website.name}">
    <div class="alert-status">
        <div class="source-website-light source-website-light-${
          website.status / 100 / 2 === 1
            ? "green"
            : website.status / 100 / 4 === 1
            ? "red"
            : "yellow"
        }"></div>
    </div>
    <div class="source-website-alert-name">
   <a href="${website.url}" target="_blank">${website.name}</a>
    </div>
</div>
    `;
  return html;
}

function calendarWeek(tileData, index) {
  let localIndex = index * 7;

  let weekdayStr = "";

  for (let i = 0; i < 7; i++) {
    weekdayStr += `<span localDate="${tileData[localIndex].dateData}" selected="false">${tileData[localIndex].tileData}</span>`;
    localIndex++;
  }

  const html = `
  <div class="weekday" row="${index + 1}">
    ${weekdayStr}
  </div>
  `;
  return html;
}

function calendarMonthSelectorRow(date, monthString) {
  const currentMonth = date.getMonth() + 1 + "/1/" + date.getFullYear();
  const prevMonthDate = new Date(date.getFullYear(), date.getMonth(), 0);
  const prevMonth =
    prevMonthDate.getMonth() + 1 + "/1/" + prevMonthDate.getFullYear();

  const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const nextMonth =
    nextMonthDate.getMonth() + 1 + "/1/" + nextMonthDate.getFullYear();

  const html = `
  <div class="month-selector">
      <button class="prev-month" month="${prevMonth}">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
        </svg>    
      </button>
      <div class="current-month" month="${currentMonth}">${monthString}</div>
      <button class="next-month" month="${nextMonth}">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
  </div>
  `;
  return html;
}

function transactionSummaryTable(summaryData) {
  let tableDataRowHtml = "";
  let totalNumber = 0;
  for (let key in summaryData) {
    tableDataRowHtml += `                        
      <tr class="data-row">
        <td>${key}</td>
        <td>${summaryData[key]}</td>
        <td>N/A</td>
      </tr>`;
    totalNumber += summaryData[key];
  }
  const html =
    `
  <table class="results-summary-table">
      <tr>
          <th>Source Websites</th>
          <th>Daily Number</th>
          <th>Average Number</th>
      </tr>
      ` +
    tableDataRowHtml +
    `
      <tr class="summary-footer-row">
          <td>Total</td>
          <td class="summary-daily-total">${totalNumber}</td>
          <td class="summary-daily-avg">N/A</td>
      </tr>
  </table>
  `;

  return html;
}

function transactionResultListItem(transaction) {
  // Generate the Google search URL
  const googleSearchURL = `https://www.google.com/search?q=${encodeURIComponent(
    transaction.title
  )}`;
  const html = `
    <li class="list-item" site="${transaction.hostName}">
      <div class="transaction-site">${
        transaction.hostName.toUpperCase().substr(0, 1) || ""
      }</div>
      <div class="transaction-title" site="${transaction.hostName}"><a href="${
    transaction.href
  }" target="_blank">${transaction.title}</a></div>
      <div class="transaction-date">${transaction.date}</div>
      <div class="transaction-link">
          <a href="${
            transaction.href
          }" target="_blank"><i class="fa-solid fa-right-to-bracket"></i></a>
          <a href="${googleSearchURL}" target="_blank"><i class="fa-brands fa-google"></i></a>
      </div>
    </li>
 `;

  return html;
}

export default {
  webStatus,
  calendarWeek,
  calendarMonthSelectorRow,
  transactionResultListItem,
  transactionSummaryTable,
};
