import { z } from "zod";
import { MenuItemsSchema } from "./MenuItemsType";

export const ResponseMenuItemsSchema = z.object({
    status: z.string(),
    data: z.object({
        items: z.array(MenuItemsSchema)
    }).optional(),
    error: z.object({
        message: z.string()
    }).optional()
});

export type ResponseMenuItemsType = z.infer<typeof ResponseMenuItemsSchema>;