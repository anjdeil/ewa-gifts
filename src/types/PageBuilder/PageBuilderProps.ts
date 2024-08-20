import { z } from "zod";
import { PageBuilderFullSectionsSchema } from "./PageBuilderFullSectionsSchema";

export const PageBuilderPropsSchema = z.object({
    sections: z.array(PageBuilderFullSectionsSchema),
    isContainer: z.boolean().optional()
});

export type PageBuilderProps = z.infer<typeof PageBuilderPropsSchema>;
