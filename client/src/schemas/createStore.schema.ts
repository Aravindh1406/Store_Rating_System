import { z } from "zod";

export const createStoreSchema = z.object({
    name: z
        .string()
        .min(20, "Store name must be at least 20 characters")
        .max(60, "Store name cannot exceed 60 characters"),

    email: z
        .email("Invalid email"),

    address: z
        .string()
        .max(400, "Address cannot exceed 400 characters"),

    ownerId: z.coerce
        .number()
        .min(1, "Please select a store owner")
});

export type CreateStoreForm = z.output<typeof createStoreSchema>;