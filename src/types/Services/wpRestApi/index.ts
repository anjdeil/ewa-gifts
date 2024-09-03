import { z } from "zod";

export const AuthConfigSchema = z.object({
    username: z.string(),
    password: z.string()
});

export type paramsType = Record<string, string[] | string | number | undefined>;
export type method = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type AuthConfig = z.infer<typeof AuthConfigSchema>;
