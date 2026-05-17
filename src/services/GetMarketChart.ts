export async function getCoinMarketChart (id: string) {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`, 
            {
                method: "GET",
            }
        );
        return res.json();
}