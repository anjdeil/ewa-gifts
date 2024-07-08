import { z } from "zod";

const PopupTypeSchema = z.object({
    onClose: z.any()
});

export type PopupType = z.infer<typeof PopupTypeSchema>;