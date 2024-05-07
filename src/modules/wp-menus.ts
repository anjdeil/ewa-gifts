import { z } from "zod";

const wpMenuTypeSchema = z.object({
    title: z.string(),
    url: z.string()
})

const wpNavLinksSchema = z.object({
    data: z.union([z.array(wpMenuTypeSchema), z.undefined()]),
    error: z.union([z.object({}), z.undefined()]),
    isError: z.boolean(),
    isLoading: z.boolean()
});

const wpNavPropsSchema = z.object({
    navLinks: wpNavLinksSchema
})


export type wpMenuType = z.infer<typeof wpMenuTypeSchema>;
export type wpNavLinks = z.infer<typeof wpNavLinksSchema>;
export type wpNavLinksProps = z.infer<typeof wpNavPropsSchema>;