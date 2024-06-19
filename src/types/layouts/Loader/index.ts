import { z } from "zod";

const LoaderPropsShema = z.object({
    className: z.string().optional(),
    thickness: z.number(),
    size: z.number(),
    color: z.string().optional()
});

export type LoaderProps = z.infer<typeof LoaderPropsShema>;