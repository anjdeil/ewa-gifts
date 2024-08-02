import React, { FC } from "react";

interface ProductTitlingPropsType {
    title: string,
    sku: string | null
}

const ProductTitling: FC<ProductTitlingPropsType> = ({ title, sku }) => {
    return (
        <div>
            {title &&
                <h1 className={`secondary-title`}>
                    {title}
                </h1>
            }
            {sku &&
                <p className={`text-gray`}>
                    {sku}
                </p>}
        </div>
    );
}

export default ProductTitling;