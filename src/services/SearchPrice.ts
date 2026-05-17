export async function searchPrices (query: string) {
        const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`,
            {
                method: "GET",
            }
        );
        return res.json();
}