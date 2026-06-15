import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Modal from "../components/ui/Modal";
import {
  loginSchema,
  type LoginFormData,
} from "../schemas/LoginSchema";

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

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);

    // Example API call
    // await loginUser(data);
  };

  return (
    <Modal>
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
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full hover:border-1 hover:border-white border border-1 border-gray-600 focus-within:ring-1 focus-within:ring-white px-3 py-4 outline-none bg-black"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
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
              placeholder="Enter your password"
              {...register("password", { setValueAs: (value) => String(value) })}
              className="w-full hover:border-1 hover:border-white border-1 border-gray-600 px-3 py-4 outline-none bg-black focus-within:ring-1 focus-within:ring-white"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white py-4 text-black"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
    </Modal>
  );
}

export default LoginModal;