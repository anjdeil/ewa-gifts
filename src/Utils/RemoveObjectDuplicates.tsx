// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RemoveObjectDuplicates(arr: Record<string, any>[], fieldName: string): Record<string, any>[]
{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uniqueItems: Record<string, any>[] = [];
    const existingKeys = new Set<string>();

    if (typeof fieldName !== "string")
    {
        return [];
    }

    for (const item of arr)
    {
        if (fieldName in item)
        {
            const fieldValue = item[fieldName];

            if (!existingKeys.has(String(fieldValue)))
            {
                uniqueItems.push(item);
                existingKeys.add(String(fieldValue));
            }
        }
    }

    return uniqueItems;
}
