const webStatus = async () => {
  const url = `/webStatus`;
  const res = await fetch(url, {
    method: "GET",
  });

  const data = await res.json();

  console.log(data);
  return data;
};

export default {
  webStatus,
};
