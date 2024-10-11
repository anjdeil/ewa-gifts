import { defaultAttributesType } from "@/types/Shop";

export function findOrDefault(array: defaultAttributesType[], paramsAttr: string): defaultAttributesType
{
    const sizeOption = array.find(item => item.option === paramsAttr);
    console.log('sizeOption', sizeOption);
    if (!sizeOption)
    {
        return array[0];
    }
    return sizeOption.option ? sizeOption : array[0];
}