import { lineOrderItems } from "@/types/store";
type LineOrderItemsKey = keyof lineOrderItems;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function removeObjectDuplicates(arr: lineOrderItems[], fieldName: any): lineOrderItems[]
{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uniqueItems: lineOrderItems[] = [];
    const existingKeys = new Set<string>();

    if (typeof fieldName !== "string")
    {
        return [];
    }

    for (const item of arr)
    {
        if (fieldName in item)
        {
            const fieldValue = item[fieldName as LineOrderItemsKey];

            if (!existingKeys.has(String(fieldValue)))
            {
                uniqueItems.push(item);
                existingKeys.add(String(fieldValue));
            }
        }
    }

    return uniqueItems;
}
