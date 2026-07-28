import { useNavigate } from "react-router-dom";
import video from "../../assets/134428-759734802.mp4";


const Home = () => {
  const navigate = useNavigate();
  

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <section className="w-full min-h-screen md:w-[50vw] flex items-center justify-center px-8 py-12 bg-white">
        <div className="">

          <h1 className="text-5xl md:text-6xl font-bold mt-4 leading-tight text-gray-700">
            Track Crypto
            <span className="block text-green-500">
              In Real Time
            </span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Monitor cryptocurrency prices, market trends,
            and real-time updates
          </p>

          <div className="mt-8">
              <button
                onClick={() => navigate("/prices")}
                className="bg-green-400 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-500 active:bg-green-600 transition cursor-pointer"
              >
                View Prices
              </button>
          </div>
        </div>
      </section>

      {/* Right Section */}
      <section className="hidden md:block md:w-[50vw] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
      </section>


    </main>
  );
};

export default Home;