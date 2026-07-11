import { z } from "zod";

export const registerSchema = z.object({

    name: z
        .string()
        .min(20, "Minimum 20 characters")
        .max(60, "Maximum 60 characters"),

    email: z
        .string()
        .email("Invalid email"),

    address: z
        .string()
        .max(400),

    password: z
        .string()
        .regex(
            /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/,
            "Password must contain uppercase and special character"
        )

});

export type RegisterFormData =
    z.infer<typeof registerSchema>;