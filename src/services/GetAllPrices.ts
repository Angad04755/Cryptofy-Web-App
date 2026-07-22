export const GetAllPrices = async (currency: string) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=1&sparkline=false`,
    {
      method: "GET",
    }
  );

  return res.json();
};