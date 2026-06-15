import { useNavigate } from "react-router-dom";
import LoginModal from "../../auth/LoginModal";
import { useState } from "react";
const Home = () => {
  const navigate = useNavigate();
    const [openModal, setOpenmodal] = useState(false)
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

        <div className="flex place-content-center gap-5">
          <button
          
            
            className="w-fit bg-white px-5 py-2 text-black rounded-xl font-semibold cursor-pointer transition hover:bg-white/80"
            onClick={() =>setOpenmodal(true)}
          >
            Login
          </button>
          <button className="bg-black text-white px-7 py-3 text-lg rounded-xl cursor-pointer hover:bg-black/80 transition font-semibold"
            onClick={() => navigate("/prices")}
          >
          View Prices
          </button>
          
        </div>
      </article>
      {openModal && (
      <LoginModal onclose={() => setOpenmodal(false)}/>
      )}
    </section>
    
  );
};

export default Home;