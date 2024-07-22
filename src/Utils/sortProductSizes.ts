// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sortProductSizes(array: any): any[]
{
    return (
        array.sort((a: { name: string; }, b: { name: string; }) =>
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