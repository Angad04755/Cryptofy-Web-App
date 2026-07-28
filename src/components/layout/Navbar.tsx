import Logo from "../../assets/Logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Bitcoin, ChevronUp, SearchIcon, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/AuthSlice";
import type { RootState } from "../../redux/store";
import LoginModal from "../auth/LoginModal";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [showDropdown, setShowDropdown] = useState(false);
  const [openModal, setOpenmodal] = useState(false);

  const authenticated = useSelector(
    (state: RootState) => state.auth.authState
  );

  const handleLogout = () => {
    setShowDropdown(false);
    localStorage.removeItem("isAuthenticated");
    dispatch(login(false));
    toast.success("Loged out");
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
            <img
              src={Logo}
              width={30}
              height={30}
              alt="logo"
            />

            <span className="ml-[-8px] text-xl md:text-2xl font-bold text-cyan-900">
              RYPTOFY
            </span>
          </div>

          {/* Right Section */}
          <div className="flex place-content-center gap-4">
            <span
              className={`py-3 px-3 cursor-pointer rounded-full ${
                location.pathname === "/prices"
                  ? "bg-green-200"
                  : ""
              }`}
              onClick={() => navigate("/prices")}
            >
              <Bitcoin
                className={`py-1 ${
                  location.pathname === "/prices"
                    ? "fill-black"
                    : ""
                }`}
                size={35}
                color="gray"
              />
            </span>

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
                size={25}
                color="gray"
                className={
                  location.pathname === "/search"
                    ? "fill-black"
                    : ""
                }
              />
            </span>

            {/* User Dropdown */}
            {!authenticated ? (
              <button
                onClick={() => setOpenmodal(true)}
                className="bg-cyan-600 text-white px-4 rounded-xl font-medium hover:bg-cyan-700 active:bg-cyan-800 transition cursor-pointer"
              >
                Login
              </button>
            ) : (
              <div className="relative">
                <button
                  className={`${
                    showDropdown ? "bg-yellow-200" : ""
                  } flex flex-row gap-1 cursor-pointer rounded-full py-3 px-3 transition mt-[5px]`}
                  onClick={() =>
                    setShowDropdown((prev) => !prev)
                  }
                >
                  <User
                    size={25}
                    color="gray"
                    className={
                      showDropdown ? "fill-black" : ""
                    }
                  />

                  <ChevronUp
                    size={24}
                    color="gray"
                    className={`transition ${
                      showDropdown
                        ? "rotate-180"
                        : "rotate-0"
                    }`}
                  />
                </button>

                {showDropdown && (
  <div className="absolute top-full right-0 w-48 rounded-xl bg-gray-700 border border-gray-100 shadow-lg shadow-gray-200/50 p-2 z-50">
    <button
      onClick={handleLogout}
      className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-100 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200 cursor-pointer"
    >
      <LogOut size={18} />
      <span>Logout</span>
    </button>
  </div>
)}
              </div>
            )}
          </div>
        </div>
      </div>
      {openModal && (
        <LoginModal onclose={() => setOpenmodal(false)}/>
      )}
    </section>
  );
};

export default Navbar;