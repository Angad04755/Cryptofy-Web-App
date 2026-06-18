const BASE_URL = import.meta.env.VITE_BASE_URL;
import { type LoginFormData } from "../schemas/LoginSchema";
export const CreateAccount = async (data: LoginFormData) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: data.username,
            password: data.password,
        })
    })

    if (res.status !== 200) {
        throw new Error("Couldn't Create Account")
    }

    return res.json();
}