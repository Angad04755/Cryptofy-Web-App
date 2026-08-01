import type { BookMarkCoin } from "../../types/BookMarkCoin";
import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function BookMarkList() {
  const Bookmarks: BookMarkCoin[] = JSON.parse(
    localStorage.getItem("Bookmarked") || "[]");
    const navigate = useNavigate();

    useEffect(() => {
      window.scrollTo({top: 0, behavior: "instant"});
    }, []);

  const [bookmarkedCoins, setBookMarkedCoins] =
    useState<BookMarkCoin[]>(Bookmarks);

  const handleRemoval = useCallback((id: string) => {
    const updatedCoins = bookmarkedCoins.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      "Bookmarked",
      JSON.stringify(updatedCoins)
    );

    setBookMarkedCoins(updatedCoins);
  }, [bookmarkedCoins])

  if (bookmarkedCoins.length === 0) {
    return (
      <main className="min-h-screen bg-cyan-900 px-4 py-10 md:px-8"> 
      <section className="mx-auto max-w-6xl"> 
         {/* Empty State */} 
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl bg-white/10 px-5 text-center"> 
            <h2 className="text-2xl font-semibold text-white"> No Bookmarked Coins </h2>
             <p className="mt-2 text-cyan-200"> You haven't bookmarked any coins yet. </p> 
             </div> 
             </section> 
             </main>
    );
  }

  return (
    <main className="min-h-screen bg-cyan-900 px-4 py-10 md:px-8">
      <section className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Bookmarked Coins
          </h1>

          <p className="mt-2 text-cyan-200">
            Your favorite cryptocurrencies in one place
          </p>
        </div>

        {/* Bookmark List */}
        <article className="flex w-full flex-col gap-4">
          {bookmarkedCoins.map((item) => (
            <div
              key={item.id}
              className="flex w-full items-center justify-between rounded-2xl bg-white p-5 shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer"
            onClick={() => navigate(`/coin/${item.id}`)}>
              {/* Coin Information */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  width={55}
                  height={55}
                  className="h-14 w-14 rounded-full object-contain"
                />

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-gray-800">
                      {item.name}
                    </h2>

                    <span className="rounded-md bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase text-cyan-700">
                      {item.symbol}
                    </span>
                  </div>

                  <p className="text-lg font-semibold text-gray-800">
                    ${item.price.toLocaleString()}
                  </p>

                  <p
                    className={`text-sm font-semibold ${
                      item.price_change >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.price_change.toFixed(2)}% (24h)
                  </p>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemoval(item.id)}
                className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
}

export default BookMarkList;

