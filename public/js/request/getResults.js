const transactionScraping = async (dateQryStr) => {
  const url = `/scrape-now${dateQryStr}`;
  try {
    const res = await fetch(url, {
      method: "GET",
    });

    // if res status code != 200, respond status code text
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    // Throw the error to be caught by the caller
    throw error;
  }
};

const transactionDbFetching = async (dateQryStr) => {
  const url = `/fetch-db-results${dateQryStr}`;
  try {
    const res = await fetch(url, {
      method: "GET",
    });

    // if res status code != 200, respond status code text
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    // Throw the error to be caught by the caller
    throw error;
  }
};

export default {
  transactionScraping,
  transactionDbFetching,
};
