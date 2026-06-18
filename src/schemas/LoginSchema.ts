import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().nonempty("Username is required"),

  password: z
    .string()
    .nonempty("Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;