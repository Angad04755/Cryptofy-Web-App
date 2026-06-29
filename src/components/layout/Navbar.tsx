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
            <img src={Logo} width={30} height={30} alt="logo"/>

            <span className="ml-[-8px] text-xl md:text-2xl font-bold text-cyan-900">
              RYPTOFY
            </span>
          </div>

          {/* Right Section */}
          <div className="flex place-content-center gap-4">
            <span className={`py-3 px-3 cursor-pointer rounded-full ${location.pathname === "/prices" ? "bg-green-200" : ""}`} onClick={() => navigate("/prices")}><Bitcoin className={`py-1 ${location.pathname === "/prices" ? "fill-black" : ""}`} size={35} color="gray"/></span>
            {/* Search */}
            <span
              className={`text-gray-600 flex items-center gap-1 cursor-pointer transition px-4 py-4 rounded-full ${
                location.pathname === "/search"
                  ? "bg-cyan-200"
                  : ""
              }`}
              onClick={() => navigate("/search")}
            >
              <SearchIcon
                size={25} color="gray"
                className={
                  location.pathname === "/search"
                    ? "fill-black"
                    : ""
                }
              />
            </span>

            {/* User Dropdown */}
             <button
        className={`${
          showDropdown ? "bg-yellow-200" : ""
        } flex flex-row items-center gap-1 cursor-pointer rounded-full py-2 px-2  transition`}
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <User
          size={25}
          color="gray"
          className={showDropdown ? "fill-black" : ""}
        />

        <ChevronUp
          size={24}
          color="gray"
          className={`transition ${showDropdown ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {showDropdown && (
        <div className="fixed top-15 right-2 mt-2 rounded-xl bg-white shadow-xl border border-gray-200 p-2 z-50">
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