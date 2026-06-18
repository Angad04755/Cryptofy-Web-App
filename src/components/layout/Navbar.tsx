import Logo from "../../assets/Logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchIcon, User } from "lucide-react";
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
    localStorage.removeItem("isAuthenticated");
    dispatch(login(false));
    navigate("/");
  };

  return (
    <section
      className={`${
        location.pathname === "/" ? "hidden" : "block"
      } sticky top-0 z-50 w-full border-b border-white/20 bg-gradient-to-r from-emerald-500 to-teal-400 backdrop-blur-md shadow-sm`}
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
          <div className="flex items-center gap-4">
            {/* Search */}
            <span
              className={`text-black flex items-center gap-1 cursor-pointer transition px-2 py-1 rounded-lg ${
                location.pathname === "/search"
                  ? "bg-white"
                  : "hover:bg-white/20"
              }`}
              onClick={() => navigate("/search")}
            >
              <SearchIcon
                size={20}
                className={
                  location.pathname === "/search"
                    ? "fill-black"
                    : ""
                }
              />
              Search
            </span>

            {/* User Dropdown */}
              <button className="cursor-pointer rounded-full p-2 hover:bg-white/20 transition"  onClick={() => setShowDropdown((prev) => !prev)}>
                <User size={24} color="black" />
              </button>

              {showDropdown && (
  <div className="fixed top-13 right-3 rounded-xl bg-white shadow-xl border border-gray-200 p-2">
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-red-500 rounded-lg hover:bg-red-50 transition cursor-pointer"
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