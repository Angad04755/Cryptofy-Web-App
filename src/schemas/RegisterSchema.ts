import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().nonempty("Username must be at least 3 characters"),
  email: z.email(),
  password: z.string().nonempty("Password must be at least 6 characters"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;