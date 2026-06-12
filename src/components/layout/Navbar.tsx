import Logo from "../../assets/Logo.png"
import { useLocation, useNavigate } from "react-router-dom";
import { SearchIcon } from "lucide-react";

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();



  return (

   <section
  className={`${
    location.pathname === "/" ? "hidden" : "block"
  } sticky top-0 z-50 w-full border-b border-white/20 bg-gradient-to-r from-emerald-500 to-teal-400 backdrop-blur-md shadow-sm`}
>

      <div className="mx-auto px-4 md:px-6 py-2">

        {/* TOP ROW */}

        <div className="">

          {/* Logo */}

          <div
            className="flex cursor-pointer"
            onClick={() => navigate("/")}
          >

            <img src={Logo} width={30} height={30} alt="logo" />

            <span className="ml-[-8px] text-xl md:text-2xl font-bold text-black">

              RYPTOFY

            </span>

          </div>


          {/* SearchBox Desktop */}

                    {/* User */}

          
        {/* SearchBox Mobile */}

        <span className={`text-black flex flex-row gap-1 mt-[-30px] float-right cursor-pointer transition px-2 py-1 ${location.pathname === "/search" ? "bg-white px-2 py-1 rounded-lg" : ""}`} onClick={() => navigate("/search")}><SearchIcon size={20} color="black" className={`${location.pathname === "/search" ? "fill-black" : ""}`}/> Search</span>
      </div>
    </div>
    </section>
  );
};

export default Navbar;
