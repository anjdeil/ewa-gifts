import { PageBuilderInner } from "@/types";

export const transformBuilderSplitSection = (sections: PageBuilderInner[]) =>
{
    return {
        leftSections: [...sections[0].sections],
        rightSections: [...sections[1].sections]
    }
};