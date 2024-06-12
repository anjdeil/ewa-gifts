import Head from "next/head";
import { useState } from "react";
import { addedToCart } from "@/store/reducers/CartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import { useLazyFetchProductVariationsQuery } from "@/store/wooCommerce/wooCommerceApi";

const findVariationByOptions = (variations, options) => {
    return variations.find(variation => {
        let found = true;
        variation.attributes.forEach(({ slug, option }) => {
            if (options[slug] !== option) found = false;
        });
        return found;
    })
}

const CheckPage = () => {
    const [fetchProductVariations, { data: variations, isLoading: isVariationsLoading, isError: isVariationsError }] = useLazyFetchProductVariationsQuery();

    const product = {
        id: 32706,
        type: 'variable',
        attributes: [
            {
                "id": 8,
                "name": "Kolor",
                "slug": "pa_kolor",
                "position": 0,
                "visible": true,
                "variation": true,
                "options": [
                    "bordowy (#990505)",
                    "biały (#ffffff)",
                    "czarny (#000000)",
                    "czerwony (#e61717)",
                    "granatowy (#0c0878)",
                    "niebieski (#298df2)"
                ]
            }
        ]
    };
    const dispatch = useDispatch();
    const cart = useSelector(state => state.Cart.items);


    const [choosenOptions, setChoosenOptions] = useState({
        pa_color: 'bordowy (#990505)'
    });

    const onChangeColor = (evt) => {
        setChoosenOptions((choosenOptions) => ({
            ...choosenOptions,
            pa_color: evt.target.value
        }))
    }

    const onAddedToCart = async (evt) => {
        evt.preventDefault();

        if (product.type === 'variable') {
            let variationsData = variations;
            if (variationsData === undefined) {
                const { data } = await fetchProductVariations(product.id);
                variationsData = data;
            }

            const choosenVariation = findVariationByOptions(variationsData, choosenOptions);

            dispatch(
                addedToCart({
                    id: product.id,
                    type: product.type,
                    variationId: choosenVariation.id,
                    choosenOptions: { ...choosenOptions }
                })
            );

        } else {
            dispatch(
                addedToCart({
                    id: product.id,
                    type: product.type,
                    variationId: null,
                    choosenOptions: null
                })
            );
        }


    }

    return (
        <>
            <Head>
                <title>Check Page</title>
            </Head>
            <Breadcrumbs links={[
                { name: "Home", url: "/", isCurrent: false },
                { name: "Check page", url: "/check", isCurrent: false },
                { name: "Cart", url: "check-cart", isCurrent: true }
            ]} />
            <main>
                <h1>Check Page</h1>

                <form>

                    <button onClick={(evt) => {
                        evt.preventDefault();
                        dispatch(addedToCart({
                            id: 42926,
                            type: 'simple',
                            variationId: null,
                            choosenOptions: null,
                            imageUrl: "https://new.ewagifts.pl/wp-content/uploads/2024/06/lampka-czolowa-schwarzwolf-herlen-f2308800aj307.jpeg"
                        }))
                    }}>Add simple product</button>
                    <button onClick={(evt) => {
                        evt.preventDefault();
                        dispatch(addedToCart({
                            id: 47264,
                            type: 'variable',
                            variationId: 47284,
                            choosenOptions: {
                                pa_color: 'zielony (#3dcf27)'
                            },
                            imageUrl: "https://new.ewagifts.pl/wp-content/uploads/2024/06/kubek-do-sublimacji-300-ml-sofia-383509.jpg"
                        }))
                    }}>Add some variation</button>
                </form>
            </main >
        </>
    );
};

export default CheckPage;