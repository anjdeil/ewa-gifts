import { CartItem } from "@/types/Cart";
import { ProductsCirculationsType } from "@/types/Services/customApi/Product/ProductsCirculationsType";

export default function checkCartConflict(cartItems: CartItem[], productsSpecs: ProductsCirculationsType[]) {
    return cartItems.some(({ product_id: cartProductId, variation_id: cartVariationId, quantity: cartQuantity }) => {
        const productSpecs = productsSpecs.find(({ product_id: specsProductId, variation_id: specsVariationId }) => {
            if (cartVariationId) return cartProductId === specsProductId && cartVariationId === specsVariationId;
            return cartProductId === specsProductId;
        });

        if (!productSpecs) return true;
        const { stock_quantity: specsQuantity } = productSpecs;

        return specsQuantity < cartQuantity;
    });
}