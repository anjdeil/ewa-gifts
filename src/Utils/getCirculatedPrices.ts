import { circulatedPriceType } from "@/types/Shop/ProductCalculations";

interface circulationsMeta {
    type: string,
    circulations: {
        [key: number]: number;
    }
}

export type CirculatedPriceType = {
    from: number,
    label: string,
    price: number
};

const getCirculatedPrices = (price: number, { type, circulations }: circulationsMeta): CirculatedPriceType[] => {

    const circulatedPrices: circulatedPriceType[] = [];
    const alreadyUsedCirculation = Object.values(circulations).at(-1) || 0;
    const uncirculatedPrice = type === 'direct' ? alreadyUsedCirculation : price / alreadyUsedCirculation;


    Object.entries(circulations).forEach(([quantity, value], index, circulationsEntries) => {
        const to = index !== circulationsEntries.length - 1 ? +circulationsEntries[index + 1][0] - 1 : false;
        const label = to ? `${+quantity || 1} - ${to}` : `> ${quantity}`;
        let price = type === 'direct' ? value : uncirculatedPrice * value;
        price = +price.toFixed(2);

        circulatedPrices.push({
            from: +quantity,
            label,
            price
        });
    });

    return circulatedPrices;
}

export default getCirculatedPrices;