let dataToBeDownloaded;
let dataToBeDownloadedDate;

function transactionResult(data, filename, type) {
  modifyTransactionResultForCSV(data);
  const file = new Blob(dataToBeDownloaded, { type: type });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+, Microsoft-specific method
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others non-Microsoft Browsers
    const a = document.createElement("a");
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    a.click();
    // When there exists a mapping for a Blob, it can reside in the memory.
    // So use URL.revokeObjectURL to remove it after use
    setTimeout(function () {
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

function getHeaderToData(data) {
  // grab data keys as header name
  const headers = Object.keys(data[0]);
  return headers;
}

function storeDataToBeDownloaded(data, date) {
  dataToBeDownloaded = data;
  dataToBeDownloadedDate = date;
}

function getDataToBeDownloaded() {
  return { dataToBeDownloaded, dataToBeDownloadedDate };
}

function modifyTransactionResultForCSV(data) {
  // add comma(,) to separate each column
  dataToBeDownloaded = [];
  const headers = getHeaderToData(data);
  // first row, headers
  headers.forEach((header) => {
    dataToBeDownloaded.push(header + ",");
  });
  dataToBeDownloaded.push("\n");

  // second row and beyond
  data.forEach((row) => {
    const keys = Object.keys(row);
    // test if any column value contains comma or newline, wrap it in quotes if necessary
    keys.forEach((col) => {
      dataToBeDownloaded.push(
        (/[",\n]/.test(row[col]) ? `"${row[col]}"` : row[col]) + ","
      );
    });
    // lastly, add a newline
    dataToBeDownloaded.push("\n");
  });
}

export default {
  transactionResult,
  storeDataToBeDownloaded,
  getDataToBeDownloaded,
};
