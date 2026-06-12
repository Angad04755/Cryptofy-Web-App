import SearchBox from "./SearchBox";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchPrices } from "../../services/SearchPrice";
import { type CoinSearchType } from "../../types/CoinSearchType";
function Search() {
  const [searchparams] = useSearchParams();
  const navigate = useNavigate();

  const [coins, setCoins] = useState<CoinSearchType[]>([]);
  const [loading, setLoading] = useState(false);

  const urlquery = searchparams.get("query");

  useEffect(() => {
    if (!urlquery) {
      setCoins([]);
      return;
    }

    const fetchCoins = async () => {
      try {
        setLoading(true);

        const res = await searchPrices(urlquery);

        setCoins(res.coins);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [urlquery]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-400 to-green-700">
        <section className="sticky top-10 backdrop-blur-lg">
    <SearchBox />
    </section>

      <div className="px-10 md:px-45 pt-6">
        {urlquery && (
          <h2 className="text-2xl font-bold text-white mb-6">
            Results for "{urlquery}"
          </h2>
        )}

        {loading && (
          <p className="text-white">Loading...</p>
        )}

        {!loading && coins.length === 0 && urlquery && (
          <p className="text-white">No coins found.</p>
        )}
        
        <div className="space-y-3">
          {coins.map((coin) => (
            <div
              key={coin.id}
              onClick={() => navigate(`/coin/${coin.id}`)}
              className="flex items-center gap-4 bg-white p-3 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <img
                src={coin.large}
                alt={coin.name}
                width={40}
                height={40}
              />

              <div>
                <h3 className="font-semibold">{coin.name}</h3>
                <p className="text-sm text-gray-500">
                  {coin.symbol}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Search;