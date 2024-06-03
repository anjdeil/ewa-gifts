import { z } from "zod";
import { cookieSchema } from "../Cookie";

const HomePropsSchema = z.object({
    response: z.any(),
    cookies: cookieSchema,
});

export type HomeProps = z.infer<typeof HomePropsSchema>;