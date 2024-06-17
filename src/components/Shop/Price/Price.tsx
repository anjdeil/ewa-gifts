import React, { FC } from "react";
import formatPrice from "@/Utils/formatPrice";
import { PriceProps } from "@/types/Shop/Price";

const Price: FC<PriceProps> = ({ price, withoutTax }) => {
    const formattedPrice = formatPrice(price);

    return (
        <span className="price">
            {formattedPrice}
            {withoutTax && (
                <span className="price__tax"> bez VAT</span>
            )}
        </span>
    );
}

export default Price;