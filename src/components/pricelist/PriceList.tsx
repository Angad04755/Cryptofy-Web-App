import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import Footer from "../layout/Footer";
import { GetAllPrices } from "../../services/GetAllPrices";



const PAGE_SIZE = 20;

const PriceList = () => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(1);
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [wsFailed, setWsfailed] = useState(false);
  const currency = "usd";
  // REST API - Get initial coin data
  useEffect(() => {
    const getPrices = async () => {
      try {
        const data = await GetAllPrices(currency);

        setPrices(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prices:", error);
        setLoading(false);
      }
    };

    getPrices();
  }, []);

  // Binance WebSocket - Live price updates
  useEffect(() => {
    const socket = new WebSocket(
      "wss://stream.binance.com:9443/stream?streams=%21miniTicker@arr"
    );

    socket.onmessage = (event) => {
  const data = JSON.parse(event.data).data;

  setPrices((prices) =>
  prices.map((coin) =>
    data.find(
      (item: any) =>
        item.s === `${coin.symbol.toUpperCase()}USDT`
    )
      ? {
          ...coin,
          current_price: Number(
            data.find(
              (item: any) =>
                item.s ===
                `${coin.symbol.toUpperCase()}USDT`
            ).c
          ),
          price_change_percentage_24h:
            ((Number(
              data.find(
                (item: any) =>
                  item.s ===
                  `${coin.symbol.toUpperCase()}USDT`
              ).c
            ) -
              Number(
                data.find(
                  (item: any) =>
                    item.s ===
                    `${coin.symbol.toUpperCase()}USDT`
                ).o
              )) /
              Number(
                data.find(
                  (item: any) =>
                    item.s ===
                    `${coin.symbol.toUpperCase()}USDT`
                ).o
              )) *
            100,
        }
      : coin
  )
);

   }
   socket.onerror = () => {
    setWsfailed(true);
   }
   socket.onopen = () => {
    setWsfailed(false)
   }

   return () => {
    socket.onclose;
   }


}, []);

  

  useEffect(() => {
    setCurrentIndex(1);
  }, [currency]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [currentIndex]);

  const totalPages = Math.ceil(
    prices.length / PAGE_SIZE
  );

  const start = (currentIndex - 1) * PAGE_SIZE;

  const visiblePrices = prices.slice(
    start,
    start + PAGE_SIZE
  );

  const isLastPage =
    currentIndex === totalPages || totalPages === 0;

  const pages: (number | null)[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      i === currentIndex ||
      i === currentIndex - 1 ||
      i === currentIndex + 1
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== null) {
      pages.push(null);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cyan-900">
        <SyncLoader size={15} color="white" />
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen bg-cyan-900 text-white">

      <div
  className={`${wsFailed ? "text-red-200" : "text-green-200"} sticky top-19 z-10 bg-black/20 px-4 py-1.5 text-center text-xs backdrop-blur-lg`}
>
  {wsFailed ? (
    <span className="animate-pulse">Connecting...</span>
  ) : (
    <div className="flex place-content-center  gap-2">
      <span className="h-2 w-2 animate-pulse rounded-full bg-green-200 my-auto" />
      <span className="text-md">Live</span>
    </div>
  )}
</div>

      <div className="mx-auto px-2 py-2 sm:px-4">
        <table className="w-full border-collapse text-sm text-gray-300 sm:text-base">
          <thead className="sticky top-25.5 bg-white">
            <tr className="border-b border-gray-700 text-xs uppercase tracking-wider text-gray-500">
              <th className="py-3 pl-3 md:pl-5 text-left">
                Coin
              </th>

              <th className="py-3 pr-3 md:pr-5 text-right">
                Price
              </th>

              <th className="py-3 pr-3 md:pr-5 text-right">
                24h %
              </th>
            </tr>
          </thead>

          <tbody>
            {visiblePrices.map((coin) => (
              <tr
                key={coin.id}
                onClick={() =>
                  navigate(`/coin/${coin.id}`)
                }
                className="cursor-pointer border-b border-gray-800 transition-colors hover:bg-white/5 active:bg-white/10"
              >
                <td className="py-3 pl-2 pr-2 sm:pl-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      width={28}
                      height={28}
                      className="h-7 w-7 flex-shrink-0 sm:h-8 sm:w-8"
                    />

                    <div className="min-w-0">
                      <p className="truncate font-medium text-white text-sm sm:text-base">
                        {coin.name}
                      </p>

                      <p className="text-xs uppercase text-gray-400">
                        {coin.symbol}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-3 pr-2 text-right font-semibold tabular-nums sm:pr-4">
                  $
                  {Number(
                    coin.current_price
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 8,
                  })}
                </td>

                <td
                  className={`py-3 pr-2 text-right font-medium tabular-nums sm:pr-4 ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-200"
                      : "text-red-200"
                  }`}
                >
                  {coin.price_change_percentage_24h >= 0
                    ? "▲"
                    : "▼"}{" "}
                  {Math.abs(
                    coin.price_change_percentage_24h
                  ).toFixed(2)}
                  %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2 px-4 py-6 sm:gap-3">

        <button
          disabled={currentIndex === 1}
          onClick={() =>
            setCurrentIndex((p) => p - 1)
          }
          className="flex items-center justify-center rounded-md border border-gray-600 bg-gray-800 p-1.5 text-gray-200 transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5">
          {pages.map((p, i) =>
            p === null ? (
              <span
                key={i}
                className="flex items-center px-1 text-sm text-gray-500"
              >
                …
              </span>
            ) : (
              <button
                key={i}
                onClick={() => setCurrentIndex(p)}
                className={`min-w-[32px] rounded-md px-2 py-1 text-xs font-medium transition sm:min-w-[36px] sm:text-sm ${
                  currentIndex === p
                    ? "bg-white text-black"
                    : "bg-gray-800 text-gray-200 hover:bg-gray-700"
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>

        <button
          disabled={isLastPage}
          onClick={() =>
            setCurrentIndex((p) => p + 1)
          }
          className="flex items-center justify-center rounded-md border border-gray-600 bg-gray-800 p-1.5 text-gray-200 transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <Footer />
    </section>
  );
};

export default PriceList;