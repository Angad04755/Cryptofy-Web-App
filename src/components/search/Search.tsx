import SearchBox from "./SearchBox";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchPrices } from "../../services/SearchPrice";
import { type CoinSearchType } from "../../types/CoinSearchType";

function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [coins, setCoins] = useState<CoinSearchType[]>([]);
  const [loading, setLoading] = useState(false);

  const urlQuery = searchParams.get("query");

  useEffect(() => {
    if (!urlQuery) {
      setCoins([]);
      return;
    }

    const fetchCoins = async () => {
      try {
        setLoading(true);

        const res = await searchPrices(urlQuery);

        setCoins(res.coins);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [urlQuery]);

  const topResult = coins[0];
  const otherResults = coins.slice(1);

  return (
    <main className="min-h-screen bg-black">
      <SearchBox />

      <section className="px-10 md:px-45 pt-6">
        {urlQuery && (
          <h2 className="text-2xl font-bold text-white mb-6">
            Results for "{urlQuery}"
          </h2>
        )}

        {loading && (
          <p className="text-white">Loading...</p>
        )}

        {!loading && coins.length === 0 && urlQuery && (
          <p className="text-white">No coins found.</p>
        )}

        {!loading && coins.length > 0 && (
          <>
            {/* Top Result */}
            <h3 className="text-lg font-semibold text-white mb-3">
              Top Result
            </h3>

            <div
              onClick={() => navigate(`/coin/${topResult.id}`)}
              className="flex items-center gap-4 bg-white p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition mb-8"
            >
              <img
                src={topResult.large}
                alt={topResult.name}
                width={50}
                height={50}
              />

              <div>
                <h3 className="font-semibold text-lg">
                  {topResult.name}
                </h3>

                <p className="text-sm text-gray-500 uppercase">
                  {topResult.symbol}
                </p>
              </div>
            </div>

            {/* Other Results */}
            {otherResults.length > 0 && (
              <>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Other Results
                </h3>

                <div className="space-y-3">
                  {otherResults.map((coin) => (
                    <div
                      key={coin.id}
                      onClick={() => navigate(`/coin/${coin.id}`)}
                      className="flex items-center gap-4 bg-white p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                    >
                      <img
                        src={coin.large}
                        alt={coin.name}
                        width={40}
                        height={40}
                      />

                      <div>
                        <h3 className="font-semibold">
                          {coin.name}
                        </h3>

                        <p className="text-sm text-gray-500 uppercase">
                          {coin.symbol}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default Search;