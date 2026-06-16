import { useNavigate } from "react-router-dom";
import LoginModal from "../../auth/LoginModal";
import { useState } from "react";
import video from "../../assets/stock-footage-financial-market-trends-analyzing-stock-price-movements-with-graphical-data-representations-over.mp4";

const Home = () => {
  const navigate = useNavigate();
  const [openModal, setOpenmodal] = useState(false);

  return (
    <>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed w-full min-h-screen object-cover z-[-10]"
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Content */}
      <section className="min-h-screen flex items-center justify-center">
        <article className="text-center px-6">
          <h1 className="text-4xl md:text-7xl font-bold text-green-100 mb-6">
            Track Crypto in Real-Time
          </h1>

          <div className="flex justify-center gap-5">
            <button
              className="bg-white hover:bg-white/90 px-5 py-2 text-black rounded-xl font-semibold cursor-pointer transition"
              onClick={() => setOpenmodal(true)}
            >
              Login
            </button>

            <button
              className="bg-black text-white px-7 py-3 rounded-xl font-semibold cursor-pointer"
              onClick={() => navigate("/prices")}
            >
              View Prices
            </button>
          </div>
        </article>

        {openModal && (
          <LoginModal onclose={() => setOpenmodal(false)} />
        )}
      </section>
    </>
  );
};

export default Home;