import formatPrice from "@/Utils/formatPrice";
import { PriceProps } from "@/types/Shop/Price";
import { FC } from "react";

const Price: FC<PriceProps> = ({ price, withoutTax }) => {
    const formattedPrice = formatPrice(price);

    return (
        <span className="price">
            {formattedPrice}
            {withoutTax && (
                <span> bez VAT</span>
            )}
        </span>
    );
}

export default Price;