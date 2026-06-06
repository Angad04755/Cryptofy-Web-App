import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section
      className="w-full min-h-screen bg-gradient-to-b from-green-400 to-red-400 flex items-center justify-center"
      style={{
        animation: "fadeup 0.6s ease-in-out",
      }}
    >
      <article className="text-center px-6">
        <h1 className="text-4xl md:text-7xl font-bold text-white mb-6">
          Track Crypto in Real-Time
        </h1>

        <p className="text-lg md:text-xl text-black font-semibold mb-8">
          Monitor prices, analyze trends, stay ahead of the market.
        </p>

        <div className="flex justify-center">
          <button className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2 text-lg rounded-xl cursor-pointer hover:scale-110 hover:bg-white hover:text-black transition-all duration-300 active:scale-100"
            onClick={() => navigate("/prices")}
          >
          View Prices
          </button>
          
        </div>
      </article>
    </section>
  );
};

export default Home;