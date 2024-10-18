import { typeProductType, variationsProductType } from "@/types";
import { ProductSeoType } from "@/types/seo";

export function generateProductSeoSchema(product: typeProductType, url: string, productVariation?: variationsProductType): ProductSeoType
{
    const supplierAttr = product.attributes.find(attr => attr.name === 'supplier');
    const currentSupplier = supplierAttr?.options?.[0]?.name || "";
    let eligibleQuantity = 1;

    if (productVariation)
    {
        const productCirculations = productVariation?.price_circulations?.circulations;

        if (productCirculations)
        {
            const minQuantity = Math.min(...Object.keys(productCirculations).map(key => parseInt(key, 10)));
            if (minQuantity > 0)
                eligibleQuantity = minQuantity;
        }
    }

    return {
        "@context": "http://schema.org",
        "@type": "Product",
        "description": productVariation?.description || product.description || "",
        "name": product.name || "",
        "productID": productVariation?.id || product.id || "",
        "brand": {
            "@type": "Brand",
            "name": currentSupplier
        },
        "Image": productVariation?.images[0].src || product.images[0].src || "",
        "offers": [
            {
                "@type": "Offer",
                "availability": "http://schema.org/InStock",
                "price": productVariation?.price || product.price || "",
                "priceCurrency": "PLN",
                "eligibleQuantity": {
                    "value": eligibleQuantity,
                    "unitCode": "szt.",
                    "@type": [
                        "QuantitativeValue"
                    ]
                },
                "url": url
            }
        ]
    };
}
