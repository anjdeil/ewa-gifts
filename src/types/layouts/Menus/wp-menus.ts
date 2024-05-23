import { z } from "zod";
import { SocialsSkeletonPropsSchema } from "./Socials";

const wpNavLinkSchema = z.object({
    title: z.string(),
    url: z.string(),
    isButton: z.boolean(),
    isIcon: z.string(),
    id: z.number(),
});

export const wpMenuPropsSchema = z.object({
    menuId: z.number(),
    className: z.string().optional(),
    skeleton: SocialsSkeletonPropsSchema.optional()
});

export const VerticalWpMenuPropsSchema = z.object({
    menuId: z.number(),
    className: z.string().optional(),
    height: z.number().optional()
});

export type wpNavLink = z.infer<typeof wpNavLinkSchema>;
export type wpMenuProps = z.infer<typeof wpMenuPropsSchema>;