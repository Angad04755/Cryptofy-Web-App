import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),

  password: z
    .string()
    .nonempty("Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;