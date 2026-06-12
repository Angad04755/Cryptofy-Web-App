export async function searchPrices (query: string) {
        const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`,
            {
                method: "GET",
            }
        );
        if (res.status !== 200) {
            throw new Error("Couldn't load prices")
        }
        return res.json();
}