import Head from "next/head";
import { useState } from "react";
import { addedToCart } from "@/store/reducers/CartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import Link from "next/link";

const CheckPage = () => {

    const product = {
        id: 22127,
        type: 'variable',
        attributes: [
            {
                "id": 1,
                "name": "Kolor",
                "slug": "pa_kolor",
                "position": 0,
                "visible": true,
                "variation": true,
                "options": [
                    "biały",
                    "czarny",
                    "czerwony",
                    "fioletowy",
                    "niebieski",
                    "zielony"
                ]
            }
        ]
    };
    const dispatch = useDispatch();
    const cart = useSelector(state => state.Cart);


    const [choosenOptions, setChoosenOptions] = useState({
        pa_kolor: 'biały'
    });

    const onChangeColor = (evt) => {


        setChoosenOptions((choosenOptions) => ({
            ...choosenOptions,
            pa_kolor: evt.target.value
        }))
    }

    const onAddedToCart = (evt) => {
        evt.preventDefault();

        dispatch(
            addedToCart({
                id: product.id,
                type: product.type,
                choosenOptions: { ...choosenOptions }
            })
        );

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
                    <label>
                        Quantity <br />
                        <input type="number" defaultValue={0} name="quantity" />
                    </label>
                    <br /><br />
                    <label>
                        Choose a color <br />
                        <select onChange={onChangeColor} value={choosenOptions.pa_kolor} name="pa_kolor">
                            {
                                product.attributes.find(({ slug }) => slug === "pa_kolor")?.options.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))
                            }
                        </select>
                    </label>
                    <br /><br />
                    <button onClick={onAddedToCart}>Add to cart</button>
                </form>
            </main >
        </>
    );
};

export default CheckPage;