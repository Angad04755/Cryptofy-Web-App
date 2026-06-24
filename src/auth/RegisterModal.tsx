import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Modal from "../components/ui/Modal";
import { useState } from "react";
import {
  registerSchema,
  type RegisterFormData,
} from "../schemas/RegisterSchema";
import { toast } from "sonner";
import LoginModal from "./LoginModal";

interface RegisterModalProps {
  onClose: () => void;
}

function RegisterModal({ onClose }: RegisterModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
    toast.success("Account created successfully");
    setActivetab("login");
  };
  const [activetab, setActivetab] = useState<"login" | "register">("register");

  return (
    <div>
        {activetab === "register" && (
    <Modal
      children={
        <div>
          <span className="float-right">
            <X size={25} onClick={onClose} />
          </span>

          <h2 className="mb-6 text-2xl font-bold">
            Create Account
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
                className="w-full border border-gray-600 px-3 py-4 outline-none bg-black focus:ring-1 focus:ring-white"
              />

              {errors.username && (
                <p className="mt-1 text-sm text-red-300">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter email"
                {...register("email", { setValueAs: (value) => String(value) })}
                className="w-full border border-gray-600 px-3 py-4 outline-none bg-black focus:ring-1 focus:ring-white"
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-300">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                {...register("password", { setValueAs: (value) => String(value) })}
                className="w-full border border-gray-600 px-3 py-4 outline-none bg-black focus:ring-1 focus:ring-white"
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
              className="disabled:bg-gray-800 w-full bg-white py-4 text-black hover:bg-gray-800 cursor-pointer transition"
            >
              {isSubmitting ? "Creating..." : "Create Account"}
            </button>
          </form>
          <p className="mt-4 text-center text-sm">
  Already have an account?{" "}
  <button
    type="button"
    onClick={() => setActivetab("login")}
    className="underline cursor-pointer"
  >
    Login
  </button>
</p>
        </div>
      }
    /> )}
    {activetab === "login" && (
        <LoginModal onclose={onClose}/>
    )}
    </div>
  );
}

export default RegisterModal;