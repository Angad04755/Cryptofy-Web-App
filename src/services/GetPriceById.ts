export async function getCoinbyId (id: string) {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`,
            {
                method: "GET",
            }
        );
        return res.json();
}