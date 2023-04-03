const websiteConfigBySite = async (websiteNameQryStr) => {
  const url = `/websiteConfig${websiteNameQryStr}`;
  const res = await fetch(url, {
    method: "GET",
  });

  const data = await res.json();

  return data;
};

export default {
  websiteConfigBySite,
};
