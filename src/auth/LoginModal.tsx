import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Modal from "../components/ui/Modal";
import {
  loginSchema,
  type LoginFormData,
} from "../schemas/LoginSchema";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RegisterModal from "./RegisterModal";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../redux/store";
import { login } from "../redux/slices/AuthSlice";
interface LoginModalProps {
    onclose: () => void,
}

function LoginModal({ onclose }: LoginModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  const [activetab, setActivetab] = useState<"login" | "register">("login");
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = () => {
        toast.success("Logged in");
        navigate("/prices")
        localStorage.setItem("isAuthenticated", "Authenticated")
        console.log(localStorage.getItem("isAuthenticated"));
        dispatch(login(true))
  };

  return (
    <div>
    {activetab === 'login' && (
    <Modal children={
      <div>
        <span className="float-right"><X size={25} onClick={onclose}/></span>
        <h2 className="mb-6 text-2xl font-bold">
          Login
        </h2>
        

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <label className="mb-1 block text-sm font-medium">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              {...register("username", { setValueAs: (value) => String(value) })}
              className="w-full border border-1 border-gray-600 focus-within:ring-1 focus-within:ring-white px-3 py-4 outline-none bg-black"
            />

            {errors.username && (
              <p className="mt-1 text-sm text-red-300">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { setValueAs: (value) => String(value) })}
              className="w-full border-1 border-gray-600 px-3 py-4 outline-none bg-black focus-within:ring-1 focus-within:ring-white"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-300">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white py-4 text-black disabled:bg-gray-800 hover:bg-gray-800 active:bg-gray-900  transition cursor-pointer"
          >
            {isSubmitting ? "Loging..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
  Don't have an account?{" "}
  <button
    type="button"
    onClick={() => setActivetab("register")}
    className="underline cursor-pointer"
  >
    Register
  </button>
</p>
        </div>
    }/>
    )}
    {activetab === "register" && (
      <RegisterModal onClose={onclose}/>
    )}
    </div>
  );
}

export default LoginModal;