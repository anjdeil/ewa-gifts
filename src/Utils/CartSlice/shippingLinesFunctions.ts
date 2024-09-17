import { ShippingLine } from "@/store/reducers/CartSlice";

export const saveShippingLinesToLocalStorage = (shippingLines: ShippingLine[]) => {
    if (typeof window !== 'undefined') {
        const shippingLinesJSON = JSON.stringify(shippingLines);
        localStorage.setItem('shippingLines', shippingLinesJSON);
    }
}

export const getShippingLinesFromLocalStorage = (): ShippingLine[] | undefined => {
    if (typeof window !== 'undefined') {
        const shippingLinesJSON = localStorage.getItem('shippingLines');

        if (!shippingLinesJSON) return undefined;

        const shippingLines = JSON.parse(shippingLinesJSON);
        return shippingLines;
    }

    return undefined;
}