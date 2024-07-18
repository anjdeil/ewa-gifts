import { ProductOptions } from "@/types";

export function sortProductSizes(array: Array<ProductOptions>): Array<ProductOptions>
{
    return (
        array.sort((a, b) =>
        {
            const nameA = parseInt(a.name);
            const nameB = parseInt(b.name);
            if (nameA < nameB)
                return -1;
            else if (nameA > nameB)
                return 1;
            else
                return 0;
        })
    )
}