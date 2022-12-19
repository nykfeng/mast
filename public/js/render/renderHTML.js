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

export default {
  webStatus,
  calendarWeek,
  calendarMonthSelectorRow,
};
