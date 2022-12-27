const transactionResults = async (dateQryStr) => {
  const url = `/scrape-now${dateQryStr}`;
  const res = await fetch(url, {
    method: "GET",
  });

  const data = await res.json();

  console.log(data);
  return data;
};

export default {
  transactionResults,
};
