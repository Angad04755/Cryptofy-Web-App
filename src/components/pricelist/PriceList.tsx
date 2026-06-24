"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import SelectableButton from "../ui/SelectableButton";
import { GetAllPrices } from "../../services/GetAllPrices";
import { type Price } from "../../types/PriceType";
import Footer from "../layout/Footer";

const CURRENCY_OPTIONS = [
  { label: "USD", value: "usd" },
  { label: "EUR", value: "eur" },
  { label: "GBP", value: "gbp" },
  { label: "JPY", value: "jpy" },
  { label: "INR", value: "inr" },
  { label: "BTC", value: "btc" },
];

const currency_symbols = new Map<string, string>([
  ["usd", "$"],
  ["eur", "€"],
  ["gbp", "£"],
  ["jpy", "¥"],
  ["inr", "₹"],
  ["btc", "₿"],
]);

const PAGE_SIZE = 20;

const BINANCE_EXCHANGE_INFO_URL = "https://api.binance.com/api/v3/exchangeInfo";
const BINANCE_WS_BASE = "wss://stream.binance.com:9443/stream?streams=";

type BinanceExchangeInfo = {
  symbols: {
    symbol: string;
    status: string;
  }[];
};

type LiveTicker = {
  price: number;
  changePercent: number;
};

const PriceList = () => {
  const navigate = useNavigate();
  const wsRef = useRef<WebSocket | null>(null);

  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [coins, setCoins] = useState<Price[]>([]);
  const [exchangeInfo, setExchangeInfo] = useState<BinanceExchangeInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [liveData, setLiveData] = useState<Map<string, LiveTicker>>(new Map());
  const [wsFailed, setWsFailed] = useState(false);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const data = await GetAllPrices(currency);
        setCoins(data);
      } catch (error) {
        console.error("Failed to fetch coins", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency]);

  useEffect(() => {
    const fetchExchangeInfo = async () => {
      try {
        const res = await fetch(BINANCE_EXCHANGE_INFO_URL);
        if (!res.ok) throw new Error("Failed to fetch exchange info");
        const data = await res.json();
        setExchangeInfo(data);
      } catch (error) {
        console.error("Failed to fetch exchange info", error);
      }
    };
    fetchExchangeInfo();
  }, []);

  const binanceSymbols = useMemo(() => {
    const set = new Set<string>();
    if (!exchangeInfo?.symbols) return set;
    exchangeInfo.symbols.forEach((item) => {
      if (item.status !== "TRADING") return;
      if (!item.symbol.endsWith("USDT")) return;
      const baseSymbol = item.symbol.slice(0, -4).toLowerCase();
      set.add(baseSymbol);
    });
    return set;
  }, [exchangeInfo]);

  const filteredCoins = useMemo(() => {
    if (binanceSymbols.size === 0) return [];
    return coins.filter((coin) => binanceSymbols.has(coin.symbol.toLowerCase()));
  }, [coins, binanceSymbols]);

  useEffect(() => {
    setPage(1);
  }, [currency]);

  useEffect(() => {
    if (filteredCoins.length === 0) return;

    const streams = filteredCoins
      .slice(0, 80)
      .map((coin) => `${coin.symbol.toLowerCase()}usdt@ticker`);

    if (streams.length === 0) return;

    wsRef.current?.close();
    setWsFailed(false);

    const ws = new WebSocket(`${BINANCE_WS_BASE}${streams.join("/")}`);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      const ticker = payload?.data;
      if (!ticker?.s) return;
      const baseSymbol = ticker.s.replace(/USDT$/, "").toLowerCase();
      setLiveData((prev) => {
        const updated = new Map(prev);
        updated.set(baseSymbol, {
          price: Number(ticker.c),
          changePercent: Number(ticker.P),
        });
        return updated;
      });
    };

    ws.onerror = () => setWsFailed(true);

    return () => ws.close();
  }, [filteredCoins]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [page]);

  const totalPages = Math.ceil(filteredCoins.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const visibleCoins = filteredCoins.slice(start, start + PAGE_SIZE);
  const isLastPage = page === totalPages || totalPages === 0;

  const pages: (number | null)[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      i === page ||
      i === page - 1 ||
      i === page + 1
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== null) {
      pages.push(null);
    }
  }

  if (loading || !exchangeInfo) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <SyncLoader size={15} color="white" />
      </div>
    );
  }

  const currencySymbol = currency_symbols.get(currency);

  return (
    <section className="w-full min-h-screen bg-black text-white">

      {/* Currency selector — sticky below navbar */}
      <div className="sticky top-14 z-20 flex justify-center bg-black/10 p-2 backdrop-blur-lg">
        <SelectableButton
          options={CURRENCY_OPTIONS}
          selected={currency}
          onChange={setCurrency}
        />
      </div>

      {/* WebSocket status */}
      <div
        className={`sticky top-[calc(3.5rem+48px)] z-10 px-4 py-1.5 text-center text-xs backdrop-blur-lg bg-black/20 ${
          wsFailed ? "text-red-300" : "text-green-300"
        }`}
      >
        {wsFailed ? "⚠ Reconnecting…" : "● Live"}
      </div>

      {/* Table header */}
      <div className="sticky top-[calc(3.5rem+48px+28px)] z-10 border-b border-gray-700 bg-gray-900/80 backdrop-blur-lg">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400 sm:grid-cols-[2fr_1fr_1fr]">
            <span>Coin</span>
            <span className="text-right">Price</span>
            <span className="text-right">24h %</span>
          </div>
        </div>
      </div>

      {/* Coin rows */}
      <div className="mx-auto max-w-5xl px-2 py-2 sm:px-4">
        {visibleCoins.length === 0 ? (
          <p className="py-16 text-center text-gray-500">No coins found.</p>
        ) : (
          <table className="w-full border-collapse text-sm text-gray-300 sm:text-base">
            <tbody>
              {visibleCoins.map((coin) => {
                const symbol = coin.symbol.toLowerCase();
                const liveTicker = liveData.get(symbol);
                const displayPrice = liveTicker?.price ?? coin.current_price;
                const displayChange =
                  liveTicker?.changePercent ?? coin.price_change_percentage_24h;
                const isPositive = displayChange >= 0;

                return (
                  <tr
                    key={coin.id}
                    onClick={() => navigate(`/coin/${coin.id}`)}
                    className="cursor-pointer border-b border-gray-800 transition-colors hover:bg-white/5 active:bg-white/10"
                  >
                    {/* Coin name + symbol */}
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

                    {/* Price */}
                    <td className="py-3 pr-2 text-right font-semibold tabular-nums sm:pr-4">
                      <span className="text-sm sm:text-base">
                        {currencySymbol}
                        {displayPrice.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 8,
                        })}
                      </span>
                    </td>

                    {/* 24h % */}
                    <td
                      className={`py-3 pr-2 text-right font-medium tabular-nums sm:pr-4 ${
                        isPositive ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      <span className="text-sm sm:text-base">
                        {isPositive ? "▲" : "▼"}{" "}
                        {Math.abs(displayChange).toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2 px-4 py-6 sm:gap-3">
        {/* Prev */}
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          aria-label="Previous page"
          className="flex items-center justify-center rounded-md border border-gray-600 bg-gray-800 p-1.5 text-gray-200 transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page numbers */}
        <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5">
          {pages.map((p, i) =>
            p === null ? (
              <span key={i} className="flex items-center px-1 text-gray-500 text-sm">
                …
              </span>
            ) : (
              <button
                key={i}
                onClick={() => setPage(p)}
                className={`min-w-[32px] rounded-md px-2 py-1 text-xs font-medium transition sm:min-w-[36px] sm:text-sm ${
                  page === p
                    ? "bg-white text-black"
                    : "bg-gray-800 text-gray-200 hover:bg-gray-700"
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>

        {/* Next */}
        <button
          disabled={isLastPage}
          onClick={() => setPage((p) => p + 1)}
          aria-label="Next page"
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