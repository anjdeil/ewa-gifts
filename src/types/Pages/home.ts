import { z } from "zod";

const HomePropsSchema = z.object({
    response: z.any()
});

export type HomeProps = z.infer<typeof HomePropsSchema>;