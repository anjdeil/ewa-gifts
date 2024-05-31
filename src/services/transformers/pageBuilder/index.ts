import { transformBuilderSplitProps } from "@/types";

export const transformBuilderSplitSection = (sections: transformBuilderSplitProps[]) =>
{
    return {
        leftSections: [...sections[0].sections],
        rightSections: [...sections[1].sections]
    }
};