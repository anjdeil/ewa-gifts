const getCirculatedPrice = (quantity, circulatedPrices) => {
    const targetCirculation = circulatedPrices.findLast(({ from }) => from <= quantity);
    return targetCirculation ? targetCirculation.price : null;
}

export default getCirculatedPrice;