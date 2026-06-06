import Logo from "../../assets/Logo.png"
import { useLocation, useNavigate } from "react-router-dom";


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

        <div className="grid grid-cols-2 md:grid-cols-3 items-center">

          {/* Logo */}

          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >

            <img src={Logo} width={35} height={35} alt="logo" />

            <span className="ml-[-8px] text-xl md:text-2xl font-bold text-black">

              RYPTOFY

            </span>

          </div>


          {/* SearchBox Desktop */}

                    {/* User */}

          
        {/* SearchBox Mobile */}

        

      </div>
    </div>
    </section>
  );
};

export default Navbar;
