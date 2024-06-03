import { z } from "zod";

export const AuthConfigSchema = z.object({
    username: z.string(),
    password: z.string()
});

export type AuthConfig = z.infer<typeof AuthConfigSchema>;
