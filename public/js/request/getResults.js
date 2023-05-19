const transactionResults = async (dateQryStr) => {
  const url = `/scrape-now${dateQryStr}`;
  try {
    const res = await fetch(url, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Network response was not OK");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    // Handle the error
    console.log("Logging");
    console.log(error.message);
    console.log("-----------------------");
    console.error("Error:", error);
    // You can either throw the error to be caught by the caller or return a default value
    throw error; // Throw the error to be caught by the caller
    // return null; // Return a default value
  }
};

const transactionFromDb = async (dateQryStr) => {};

export default {
  transactionResults,
};
