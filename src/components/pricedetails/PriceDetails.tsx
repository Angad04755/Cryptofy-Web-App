"use client";

import { useEffect, useState } from "react";
import { type CoinById } from "../../types/CoinByIdType";
import { getCoinbyId } from "../../services/GetPriceById";
import { getCoinMarketChart } from "../../services/GetMarketChart";
import PriceChart from "./PriceChart";
import { SyncLoader } from "react-spinners";
import { useParams } from "react-router-dom";

const PriceDetails = () => {
  const [coin, setCoin] = useState<CoinById | null>(null);
  const [chartPrices, setChartPrices] = useState<number[][]>([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  // Get coin details
  useEffect(() => {
    if (!id) return;

    const fetchPrice = async () => {
      try {
        setLoading(true);

        const data = await getCoinbyId(id);

        setCoin(data);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [id]);

  // Get chart data
  useEffect(() => {
    if (!id) return;

    const fetchMarketChart = async () => {
      try {
        const data = await getCoinMarketChart(id);

        setChartPrices(data.prices ?? []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMarketChart();
  }, [id]);

  // Binance WebSocket
  useEffect(() => {
    if (!coin) return;

    const socket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${coin.symbol.toLowerCase()}usdt@ticker`
    );

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setCoin({...coin, market_data: {
        ...coin.market_data,
        current_price: {
          ...coin.market_data.current_price,
          usd: Number(data.c),
        },
        price_change_percentage_24h: Number(data.P),
      },
    });

    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, [coin]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cyan-900">
        <SyncLoader size={25} color="white" />
      </div>
    );
  }

  if (!coin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cyan-900">
        <span className="text-xl text-gray-400">
          Cannot get coin details currently
        </span>
      </main>
    );
  }

  const currentPrice = coin.market_data.current_price.usd;

const priceChange =
  coin.market_data.price_change_percentage_24h;


  const isPositive = priceChange >= 0;

  return (
    <section className="min-h-screen bg-cyan-900 px-4 py-10 text-white md:px-6">
      <div className="mx-auto max-w-5xl space-y-10">

        {/* Coin Header */}
        <div className="flex flex-wrap gap-5">
          <img
            src={coin.image.large}
            alt={coin.name}
            width={64}
            height={64}
          />

          <div>
            <h1 className="text-3xl font-bold">
              {coin.name}

              <span className="ml-2 text-sm uppercase text-gray-400">
                ({coin.symbol})
              </span>
            </h1>

            <p className="text-sm text-gray-400">
              Rank #{coin.market_cap_rank}
            </p>
          </div>
        </div>

        {/* Live Price */}
        <div>
          <p className="text-2xl font-semibold text-white md:text-4xl">
            ${currentPrice.toLocaleString()}
          </p>

          <p
            className={`text-sm font-semibold ${
              isPositive
                ? "text-green-200"
                : "text-red-200"
            }`}
          >
            {priceChange.toFixed(2)}% (24h)
          </p>
        </div>

        {/* Chart */}
        <div className="rounded-xl p-5">
          <p className="mb-3 text-sm text-gray-400">
            Last 7 Days
          </p>

          <PriceChart
            prices={chartPrices}
            livePrice={currentPrice}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 rounded-xl p-6 text-gray-700 shadow-lg md:grid-cols-3">

          <Stat
            label="Market Cap"
            value={`$${coin.market_data.market_cap.usd.toLocaleString()}`}
          />

          <Stat
            label="FDV"
            value={
              coin.market_data.fully_diluted_valuation?.usd
                ? `$${coin.market_data.fully_diluted_valuation.usd.toLocaleString()}`
                : "N/A"
            }
          />

          <Stat
            label="24h Volume"
            value={`$${coin.market_data.total_volume.usd.toLocaleString()}`}
          />

          <Stat
            label="Circulating Supply"
            value={coin.market_data.circulating_supply.toLocaleString()}
          />

          <Stat
            label="Max Supply"
            value={
              coin.market_data.max_supply
                ? coin.market_data.max_supply.toLocaleString()
                : "∞"
            }
          />

          <Stat
            label="All Time High"
            value={`$${coin.market_data.ath.usd.toLocaleString()}`}
          />
        </div>

        {/* Description */}
        <div className="rounded-xl p-6">
          <h2 className="mb-2 text-lg font-semibold text-white">
            About {coin.name}
          </h2>

          <p className="text-sm leading-relaxed text-gray-300">
            {coin.description.en
              .replace(/<[^>]+>/g, "")
              .slice(0, 500)}
            ...
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6 px-6 text-sm">
          <ExternalLink
            href={coin.links.homepage[0]}
            label="Website"
          />

          <ExternalLink
            href={coin.links.blockchain_site[0]}
            label="Explorer"
          />

          <ExternalLink
            href={coin.links.repos_url.github[0]}
            label="GitHub"
          />
        </div>

      </div>
    </section>
  );
};

const Stat = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div>
    <p className="text-sm text-gray-400">
      {label}
    </p>

    <p className="break-words font-medium text-white">
      {value}
    </p>
  </div>
);

const ExternalLink = ({
  href,
  label,
}: {
  href: string;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="text-white hover:underline"
  >
    {label}
  </a>
);

export default PriceDetails;