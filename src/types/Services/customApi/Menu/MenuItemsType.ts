import { z } from "zod";

export const MenuItemSchema = z.object({
    title: z.string(),
    type: z.string(),
    menu_order: z.number(),
    parent_id: z.number(),
    url: z.string(),
    is_button: z.boolean(),
    fa_icon_code: z.string()
});

export const MenuItemsSchema = z.object({
    id: z.number(),
    items: z.array(MenuItemSchema)
});

export type MenuItemsType = z.infer<typeof MenuItemsSchema>;