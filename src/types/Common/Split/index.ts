import { z } from "zod";

const SplitPropsSchema = z.object({
    leftContent: z.any(),
    rightContent: z.any(),
    isReversed: z.boolean()
});

export type SplitProps = z.infer<typeof SplitPropsSchema>;