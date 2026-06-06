"use client";

import { useEffect, useState } from "react";
import { type CoinById } from "../../types/CoinByIdType";
import { getCoinbyId } from "../../services/GetPriceById";
import { getCoinMarketChart } from "../../services/GetMarketChart";
import PriceChart from "./PriceChart";
import { SyncLoader } from "react-spinners";
import { useParams } from "react-router-dom";

type LiveTicker = {
  price: number;
  changePercent: number;
};

const PriceDetails = () => {
  const [coin, setCoin] = useState<CoinById | null>(null);
  const [chartPrices, setChartPrices] = useState<number[][]>([]);
  const [loading, setLoading] = useState(true);
  const [liveTicker, setLiveTicker] = useState<LiveTicker | null>(null);

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
        return;
    }
    const fetchPrice = async () => {
      try {
        setLoading(true);

        const res = await getCoinbyId(id);

        setCoin(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [id]);

  useEffect(() => {
    if (!id) {
        return;
    }
    const fetchMarketChart = async () => {
      try {
        const res = await getCoinMarketChart(id);

        // FIX: only store the prices array
        setChartPrices(res.prices ?? []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMarketChart();
  }, [id]);

  useEffect(() => {
    if (!coin?.symbol) return;

    const symbol = coin.symbol.toLowerCase();

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol}usdt@ticker`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setLiveTicker({
        price: Number(data.c),
        changePercent: Number(data.P),
      });
    };

    ws.onerror = (error) => {
      console.error(error);
    };

    return () => ws.close();
  }, [coin]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-300 flex items-center justify-center">
        <SyncLoader size={25} color="black" />
      </div>
    );
  }


  const currentPrice =
    liveTicker?.price ??
    coin.market_data.current_price.usd;

  const priceChange =
    liveTicker?.changePercent ??
    coin.market_data.price_change_percentage_24h;

  const isPositive = priceChange >= 0;

  return (
    <section className="min-h-screen bg-gray-300 text-black px-4 md:px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Coin Header */}
        <div className="flex items-center gap-5 flex-wrap">
          <img
            src={coin.image.large}
            alt={coin.name}
            width={64}
            height={64}
          />

          <div>
            <h1 className="text-3xl font-bold">
              {coin.name}

              <span className="ml-2 text-gray-400 uppercase text-sm">
                ({coin.symbol})
              </span>
            </h1>

            <p className="text-gray-400 text-sm">
              Rank #{coin.market_cap_rank}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div className="bg-black rounded-xl px-4 py-3 w-fit">
            <p className="text-2xl md:text-4xl font-semibold text-white">
              ${currentPrice.toLocaleString()}
            </p>

            <p
              className={`text-sm font-semibold ${
                isPositive
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {priceChange.toFixed(2)}% (24h)
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-black rounded-xl p-5">
          <p className="text-gray-400 text-sm mb-3">
            Last 7 Days
          </p>

          <PriceChart
            prices={chartPrices}
            livePrice={liveTicker?.price}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-black rounded-xl p-6">
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
        {coin.description.en && (
          <div className="bg-black rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-2">
              About {coin.name}
            </h2>

            <p className="text-sm text-gray-300 leading-relaxed">
              {coin.description.en
                .replace(/<[^>]+>/g, "")
                .slice(0, 500)}
              ...
            </p>
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-6 text-sm">
          {coin.links.homepage[0] && (
            <ExternalLink
              href={coin.links.homepage[0]}
              label="Website"
            />
          )}

          {coin.links.blockchain_site[0] && (
            <ExternalLink
              href={coin.links.blockchain_site[0]}
              label="Explorer"
            />
          )}

          {coin.links.repos_url.github[0] && (
            <ExternalLink
              href={coin.links.repos_url.github[0]}
              label="GitHub"
            />
          )}
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
    <p className="text-gray-400 text-sm">
      {label}
    </p>

    <p className="text-white font-medium break-words">
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
    className="text-blue-500 hover:underline"
  >
    {label}
  </a>
);

export default PriceDetails;