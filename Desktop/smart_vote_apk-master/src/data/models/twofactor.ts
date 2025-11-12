import type { user } from "./user.model";
import { z } from "zod";


export type twofactor = {
    id: number,
    email: string,
    code: number,
    success: boolean;
    user: user,
    token: string;
    error?: string;

}


export const twoFactorSchema = z.object({
  code: z.string().length(6, "Le code doit contenir 6 chiffres"),
});

export type TwoFactorData = z.infer<typeof twoFactorSchema>;
