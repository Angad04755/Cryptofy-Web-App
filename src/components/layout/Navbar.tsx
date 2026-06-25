import Logo from "../../assets/Logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Bitcoin, ChevronUp, SearchIcon, User } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/AuthSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    setShowDropdown(false);
    localStorage.clear();
    dispatch(login(false));
    navigate("/");
  };

  return (
    <section
      className={`${
        location.pathname === "/" ? "hidden" : "block"
      } sticky top-0 z-50 w-full border-b border-white/20 bg-white backdrop-blur-md shadow-sm`}
    >
      <div className="mx-auto px-4 md:px-6 py-2">
        <div className="flex items-center justify-between">
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

          {/* Right Section */}
          <div className="flex place-content-center gap-4">
            <span className={`py-1 px-2 cursor-pointer ${location.pathname === "/prices" ? "bg-green-200 rounded-full" : ""}`} onClick={() => navigate("/prices")}><Bitcoin className={`py-1 ${location.pathname === "/prices" ? "fill-black" : ""}`} size={35} color="black"/></span>
            {/* Search */}
            <span
              className={`text-black flex items-center gap-1 cursor-pointer transition px-2 py-1 rounded-lg ${
                location.pathname === "/search"
                  ? "bg-black text-white"
                  : ""
              }`}
              onClick={() => navigate("/search")}
            >
              <SearchIcon
                size={20}
                className={
                  location.pathname === "/search"
                    ? "fill-white"
                    : ""
                }
              />
              Search
            </span>

            {/* User Dropdown */}
             <button
        className={`${
          showDropdown ? "bg-yellow-200" : ""
        } flex flex-row items-center gap-1 cursor-pointer rounded-full p-2  transition`}
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <User
          size={24}
          color="black"
          className={showDropdown ? "fill-white" : ""}
        />

        <ChevronUp
          size={24}
          color="black"
          className={`transition ${showDropdown ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {showDropdown && (
        <div className="fixed top-11 right-2 mt-2 rounded-xl bg-white shadow-xl border border-gray-200 p-2 z-50">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-500 rounded-lg hover:bg-red-50 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
            </div>
          </div>
        </div>
    </section>
  );
};

export default Navbar;