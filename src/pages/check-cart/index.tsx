// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import Head from "next/head";
import { useEffect, useState } from "react";
import { useFetchProductQuery } from "@/store/custom/customApi";
import { typeProductType } from "@/types";
import Image from "next/image";
import { updateCart } from "@/store/reducers/CartSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

const CheckPage = () =>
{
    const { data } = useFetchProductQuery({ slug: 'dlugopis-vivid' });
    const product = data?.data?.item as typeProductType;

    const cart = useAppSelector(state => state.Cart);
    const dispatch = useAppDispatch();

    const [choosenOptions, setOptions] = useState();
    const [choosenVariation, setVariation] = useState();
    const [quantity, setQuantity] = useState(0);

    useEffect(() =>
    {
        if (product?.type === 'variable')
        {
            const variableAttributes = {};
            product?.attributes?.forEach(attribute =>
            {
                if (attribute.name === 'size' || attribute.name === 'color')
                {
                    variableAttributes[attribute.name] = product.default_attributes?.find(defaultAttribute => defaultAttribute.id === attribute.id).option;
                }
            });
            setOptions(variableAttributes);
        }

    }, [product]);

    console.log(choosenOptions);

    useEffect(() =>
    {
        if (product?.type === 'variable')
        {
            const targetVariation = product?.variations.find(variation =>
            {
                return Boolean(variation?.attributes?.find(({ name, option }) => choosenOptions[name] === option));
            });
            setVariation(targetVariation);
        }
    }, [choosenOptions]);

    console.log(choosenVariation);


    const handleChangeColor = (evt) =>
    {
        setOptions(options => ({ ...options, color: evt.target.value }))
    }


    return (
        <>
            <Head>
                <title>Check Page</title>
            </Head>
            <main className="container">

                {product && (
                    <div style={{ display: "grid", gridTemplateColumns: '1fr 1fr 1fr' }}>
                        <div>
                            <h1>{product.name}</h1>
                            <ul>
                                <li>Price: {choosenVariation?.price}</li>
                                <li>Stock: {choosenVariation?.stock_quantity}</li>
                            </ul><br />
                            <div>
                                <div>Choose a color</div>
                                <select name="pa_kolor" onChange={handleChangeColor}>
                                    <option value={undefined}>Choose a color</option>
                                    {product.attributes.find(({ slug }) => slug === "color")?.options.map(option => (
                                        <option
                                            key={option.slug}
                                            value={option.slug}
                                            selected={choosenOptions?.color === option.slug}
                                        >
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <br />
                            <div>
                                <div>Quantity</div>
                                <input type="number" value={quantity} onChange={(evt) => { setQuantity(evt.target.value) }} defaultValue={0} name="quantity" max={choosenVariation?.stock_quantity || 0} />
                            </div>
                            <br />
                            <button onClick={() =>
                            {
                                dispatch(updateCart({
                                    id: product.id,
                                    variationId: choosenVariation.id,
                                    quantity: +quantity
                                }))
                            }}>Add to cart</button>
                        </div>
                        <div>
                            {choosenVariation &&

                                <Image alt="777" width={300} height={300} src={choosenVariation.images[0].src} />
                            }
                        </div>
                        <div>
                            <ul>
                                {cart?.items?.map(item => (

                                    <li key={item?.variation_id || item?.product_id}>
                                        Product #{item.product_id}<br />
                                        {item?.variation_id && <>Variation #{item.variation_id}<br /></>}
                                        x{item.quantity} <br />
                                        <button onClick={() =>
                                        {
                                            dispatch(updateCart({
                                                id: item.product_id,
                                                ...(item.variation_id && { variationId: item.variation_id }),
                                                quantity: 0
                                            }))
                                        }}>Delete</button>
                                        <br />
                                        <br />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </main >
        </>
    );
};

export default CheckPage;