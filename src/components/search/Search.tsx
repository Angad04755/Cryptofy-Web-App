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

  if (!coins) {
    return;
  }
  if (loading) {
    return (
      <main className="min-h-screen bg-black">
        <SearchBox/>
        <div className="flex flex-row place-content-center">
      <span className="text-white">Searching coin..</span>
      </div>
      </main>
    )
  }

  if (urlQuery && coins.length === 0) {
    return (
      <main className="min-h-screen bg-black">
        <SearchBox/>
        <div className="flex flex-row place-content-center">
      <span className="text-white">No coins Found</span>
      </div>
      </main>
    )
  }
  return (
    <main className="min-h-screen bg-black">
      <SearchBox />

      <section className="px-10 md:px-45 pt-6">
        {urlQuery && (
          <h2 className="text-2xl font-bold text-white mb-6">
            Results for "{urlQuery}"
          </h2>
        )}

        <div>

        {coins.length > 0 && (
          <>
            {/* Top Result */}
            <h3 className="text-lg font-semibold text-white mb-3">
              Top Result
            </h3>

            <div
              onClick={() => navigate(`/coin/${coins[0].id}`)}
              className="flex items-center gap-4 bg-white p-4 rounded-lg cursor-pointer hover:bg-green-800 transition mb-8"
            >
              <img
                src={coins[0].large}
                alt={coins[0].name}
                width={50}
                height={50}
              />

              <div>
                <h3 className="font-semibold text-lg">
                  {coins[0].name}
                </h3>

                <p className="text-sm text-gray-500 uppercase">
                  {coins[0].symbol}
                </p>
              </div>
            </div>

            {/* Other Results */}
            {coins.slice(1).length > 0 && (
              <>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Other Results
                </h3>

                <div className="space-y-3">
                  {coins.slice(1).map((coin) => (
                    <div
                      key={coin.id}
                      onClick={() => navigate(`/coin/${coin.id}`)}
                      className="flex items-center gap-4 bg-white p-3 rounded-lg cursor-pointer hover:bg-green-800 transition"
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
        </div>
      </section>
    </main>
  );
}

export default Search;