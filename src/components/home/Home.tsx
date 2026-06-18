import { useNavigate } from "react-router-dom";
import LoginModal from "../../auth/LoginModal";
import { useState } from "react";
import video from "../../assets/stock-footage-financial-market-trends-analyzing-stock-price-movements-with-graphical-data-representations-over.mp4";
import { type RootState } from "../../redux/store";
import { useSelector } from "react-redux";
const Home = () => {
  const navigate = useNavigate();
  const [openModal, setOpenmodal] = useState(false);
  const authenticated = useSelector((state: RootState) => state.auth.authState);
  console.log(localStorage.getItem("isAuthenticated"))
  return (
    <main>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed w-full min-h-screen object-cover"
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Content */}
      <section className="min-h-screen flex items-center justify-center">
        <article className="text-center px-6 z-10">
          <h1 className="text-4xl md:text-7xl font-bold text-green-100 mb-6">
            Track Crypto in Real-Time
          </h1>

          <div className="flex justify-center gap-5">
            {!authenticated ? (
            <button
              className="bg-white hover:bg-white/90 px-5 py-2 text-black rounded-xl font-semibold cursor-pointer transition"
              onClick={() => setOpenmodal(true)}
            >
              Login
            </button>
            ) : (

            <button
              className="bg-blue-500 hover:bg-blue-500/90 text-white px-7 py-3 rounded-xl font-semibold cursor-pointer transition"
              onClick={() => navigate("/prices")}
            >
              View Prices
            </button>
            )}
          </div>
        </article>

        {openModal && (
          <LoginModal onclose={() => setOpenmodal(false)} />
        )}
      </section>
      </main>
    
  );
};

export default Home;