import { NextResponse } from "next/server";

async function fetchCoins() {
  const response = await fetch(
    "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0",
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b7fb49a42amshef7db1fcca0d87ap1ae100jsnc81ec0d96da4",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    }
  );
  const coins = await response.json();
  return coins;
}

export async function GET(request) {
  const coins = await fetchCoins();
  const { searchParams } = new URL(request.url);
  console.log(request.url);
  const query = searchParams.get("query");

  const filteredCoins = coins.data.coins.filter((coin) => {
    return coin.name
      .toLowerCase()
      .includes(
        query.toLocaleLowerCase() ||
          coin.symbol.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      );
  });
  return NextResponse.json(filteredCoins);
}
