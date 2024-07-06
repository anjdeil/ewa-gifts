import { typeProductType } from "@/types";

export const transformSearchBarProducts = (response: typeProductType[]) => {
    return response.map((product) => ({
        key: `p${product.id}`,
        name: product.name,
        type: "Produkt",
        slug: `product/${product.slug}`,
    }));
}