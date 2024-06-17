import { circulatedPriceType } from "@/types/Shop/ProductCalculations";

interface circulationsMeta {
    type: string,
    circulations: {
        [key: number]: number;
    }
};

const getCirculatedPrices = (price: number, { type, circulations }: circulationsMeta) => {

    const circulatedPrices: circulatedPriceType[] = [];
    const alreadyUsedCirculation = Object.values(circulations).at(-1) || 0;
    const uncirculatedPrice = type === 'direct' ? alreadyUsedCirculation : price / alreadyUsedCirculation;


    Object.entries(circulations).forEach(([quantity, value], index, circulationsEntries) => {
        const to = index !== circulationsEntries.length - 1 ? +circulationsEntries[index + 1][0] - 1 : false;
        const label = to ? `${+quantity || 1} - ${to}` : `> ${quantity}`;

        circulatedPrices.push({
            from: +quantity,
            label,
            price: type === 'direct' ? value : uncirculatedPrice * value
        });
    });

    return circulatedPrices;
}

export default getCirculatedPrices;