import { circulatedPriceType } from "@/types/Shop/ProductCalculations";

const getCirculatedPrice = (quantity: number, circulatedPrices: circulatedPriceType[]) => {
    const targetCirculation = circulatedPrices.findLast(({ from }) => from <= quantity);
    return targetCirculation ? targetCirculation.price : null;
}

export default getCirculatedPrice;