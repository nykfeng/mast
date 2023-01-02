const transactionResults = async (dateQryStr) => {
  const url = `/scrape-now${dateQryStr}`;
  const res = await fetch(url, {
    method: "GET",
  });

  const data = await res.json();

  return data;
};

export default {
  transactionResults,
};
