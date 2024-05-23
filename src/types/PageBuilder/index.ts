import { z } from "zod";

const HomePropsSchema = z.object({}).passthrough();
// type

export type PageBuilderProps = z.infer<typeof PageBuilderPropsSchema>;
