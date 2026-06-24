import { useNavigate } from "react-router-dom";
import LoginModal from "../../auth/LoginModal";
import { useState } from "react";
import video from "../../assets/134428-759734802.mp4";
import { type RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const [openModal, setOpenmodal] = useState(false);

  const authenticated = useSelector(
    (state: RootState) => state.auth.authState
  );

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <section className="w-full min-h-screen md:w-[50vw] flex items-center justify-center px-8 py-12 bg-white">
        <div className="">

          <h1 className="text-5xl md:text-6xl font-bold mt-4 leading-tight">
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
            {!authenticated ? (
              <button
                onClick={() => setOpenmodal(true)}
                className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition cursor-pointer"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => navigate("/prices")}
                className="bg-green-400 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-500 transition cursor-pointer"
              >
                View Prices
              </button>
            )}
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

      {openModal && (
        <LoginModal onclose={() => setOpenmodal(false)} />
      )}
    </main>
  );
};

export default Home;