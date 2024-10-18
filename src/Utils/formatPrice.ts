const formatPrice = (price: number | undefined | boolean) =>
{
    if (typeof (price) !== 'number') return '0.00 zł';
    return `${price.toFixed(2)} zł`;
}

export default formatPrice;