import MiniCart from "@/components/Cart/MiniCart";
import { CustomInput } from "@/components/Forms/CustomInput";
import
{
    FormHandle,
    RegistrationForm,
} from "@/components/Forms/RegistrationForm";
// import { Loader } from "@/components/Layouts/Loader";
import Notification from "@/components/Layouts/Notification";
import { PageHeader } from "@/components/Layouts/PageHeader";
import { Section } from "@/components/Layouts/Section";
import OrderTotals from "@/components/MyAccount/OrderTotals";
import { useAppSelector } from "@/hooks/redux";
import { useCreateOrderWoo } from "@/hooks/useCreateOrderWoo";
import wooCommerceRestApi from "@/services/wooCommerce/wooCommerceRestApi";
import { useFetchProductsCirculationsMutation } from "@/store/custom/customApi";
import { useLazyFetchCustomerDataQuery } from "@/store/wooCommerce/wooCommerceApi";
import { useLazyFetchUserDataQuery } from "@/store/wordpress";
import { CheckoutProps, userFieldsType } from "@/types/Pages/checkout";
import checkCartConflict from "@/Utils/checkCartConflict";
import { checkUserTokenInServerSide } from "@/Utils/checkUserTokenInServerSide";
import { Box, Typography } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { CheckoutLogin } from "./CheckoutLogin/CheckoutLogin";
import styles from "./styles.module.scss";
import { compactCartItems } from "@/services/transformers/checkout";
import { WpWooError } from "@/types";
import { FetchProductsCirculationsResponse, ProductsCirculationsType } from "@/types/Services/customApi/Product/ProductsCirculationsType";
import { MIN_SUBTOTAL_TO_CHECKOUT } from "@/Utils/consts";
import getSubtotalByLineItems from "@/Utils/getSubtotalByLineItems";

const breadLinks = [{ name: "Składania zamowienia", url: "/checkout" }];

const Checkout: FC<CheckoutProps> = ({ userData }) =>
{
    const childRef = useRef<FormHandle>(null);
    const router = useRouter();
    const {
        createOrder,
        error: createError,
        createdOrder,
    } = useCreateOrderWoo();
    const [isCreating, setCreating] = useState<boolean>(false);
    const [isModalOpen, setModalOpen] = useState<boolean>(
        userData ? false : true
    );
    const [userFields, setUserFields] = useState<userFieldsType | null>(
        userData ? userData : null
    );
    const [errMessage, setErrMessage] = useState<string | boolean>(false);
    const [checkboxes, setCheckboxes] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
    });
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [cookie] = useCookies(["userToken"]);
    const { items, shippingLines } = useAppSelector((state) => state.Cart);
    const [fetchCheckUser, { data: jwtUser, error: jwtError }] =
        useLazyFetchUserDataQuery();
    const [fetchCustomerData, { data: customerData, error: customerError }] =
        useLazyFetchCustomerDataQuery();
    const pageTitle = "Składania zamowienia";

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cartErrorMessage, setCartErrorMessage] = useState<string | null>(null);

    const [fetchProductsCirculations] = useFetchProductsCirculationsMutation();

    useEffect(() =>
    {
        console.log("Cart error message:", cartErrorMessage);
    }, [cartErrorMessage]);

    async function fetchProducts()
    {
        const shortenedCartItems = compactCartItems(items);

        try
        {
            const result = await fetchProductsCirculations({ products: shortenedCartItems }) as FetchProductsCirculationsResponse;

            if (!result?.data?.data?.items || result?.data?.data?.items.length <= 0)
                throw new Error("Coś poszło nie tak. Proszę wrócić do koszyka i spróbować jeszcze raz.");

            return result.data.data.items;
        } catch (error)
        {
            console.error((error as WpWooError).data.message)
            throw new Error("Failed to fetch circulations.");
        }
    }

    useEffect(() =>
    {
        fetchProducts()
            .then((result) => { if (result) isProductAvailable(result) })
            .catch((error) => { setCartErrorMessage(error.message); setIsLoading(false) });
    }, []);

    function isProductAvailable(products: ProductsCirculationsType[])
    {
        const conflict = checkCartConflict(items, products);
        if (conflict)
            setCartErrorMessage(
                "Coś poszło nie tak. Proszę wrócić do koszyka i spróbować jeszcze raz."
            );
        setIsLoading(false);
    }

    useEffect(() =>
    {
        if (items.length === 0)
        {
            router.push("/cart");
        } else
        {
            createOrder(items, "pending", shippingLines);
            setCreating(true);
        }
    }, [items]);

    useEffect(() =>
    {
        if (createdOrder)
        {
            setCreating(false);
        } else if (createError)
        {
            setCreating(false);
        }
    }, [createError, createdOrder]);

    useEffect(() =>
    {
        if ("userToken" in cookie)
        {
            fetchCheckUser(cookie.userToken);
            setModalOpen(false);
        } else
        {
            setModalOpen(true);
        }
    }, [cookie]);

    useEffect(() =>
    {
        if (jwtUser && "id" in jwtUser)
        {
            fetchCustomerData(jwtUser.id);
        }
    }, [jwtUser]);

    useEffect(() =>
    {
        if (jwtError) alert("Server Error");
    }, [jwtError]);

    useEffect(() =>
    {
        if (customerData) setUserFields(customerData);
        if (customerError) alert("Server Error");
    }, [customerError, customerData]);

    function onContinueClick()
    {
        setModalOpen(false);
    }

    useEffect(() =>
    {
        if (isModalOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";

        return () =>
        {
            document.body.style.overflow = "unset";
        };
    }, [isModalOpen]);

    async function onSubmitClick()
    {
        setErrMessage(false);
        if (isSubmitDisabled)
        {
            setErrMessage("Zaznacz wszystkie zgody.");
            return;
        }
        if (childRef.current)
        {
            setIsLoading(true);
            try
            {
                const products = await fetchProducts();
                console.log("Fetched products:", products);
                if (products) isProductAvailable(products);
                if (!cartErrorMessage)
                {
                    console.log("No cart error, submitting form.");
                    childRef.current.submit();
                }
            } catch (error)
            {
                setCartErrorMessage((error as Error).message);
            } finally
            {
                setIsLoading(false);
            }
            setErrMessage(false);
        }
    }

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) =>
    {
        const { name, checked } = event.target;

        if (name === "checkbox1")
        {
            const newCheckboxes = {
                checkbox1: checked,
                checkbox2: checked,
                checkbox3: checked,
                checkbox4: checked,
            };
            setCheckboxes(newCheckboxes);
            setIsSubmitDisabled(!checked);
        } else
        {
            setCheckboxes((prevState) =>
            {
                const newCheckboxes = { ...prevState, [name]: checked };

                const allCheckedExceptCheckbox1 =
                    newCheckboxes.checkbox2 &&
                    newCheckboxes.checkbox3 &&
                    newCheckboxes.checkbox4;

                if (allCheckedExceptCheckbox1)
                {
                    newCheckboxes.checkbox1 = true;
                } else if (!checked)
                {
                    newCheckboxes.checkbox1 = false;
                }

                const allChecked = Object.values(newCheckboxes).every(Boolean);
                setIsSubmitDisabled(!allChecked);
                return newCheckboxes;
            });
        }
    };

    const subtotal = createdOrder?.line_items ? getSubtotalByLineItems(createdOrder.line_items) : null;
    const isInsufficient = subtotal ? subtotal < MIN_SUBTOTAL_TO_CHECKOUT : false;
    if (isInsufficient) router.push('/cart');

    // if (isLoading) return <Loader thickness={5} size={24} />

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={`${pageTitle} page`} />
            </Head>
            <main>
                <Section className={""} isBreadcrumbs={true} isContainer={true}>
                    <PageHeader title={pageTitle} breadLinks={breadLinks} />
                    {cartErrorMessage && (
                        <Notification type="warning">
                            <Box className={styles.checkout__notification}>
                                <p>{cartErrorMessage}</p>
                                <Link href={"/cart"}>
                                    Powrót do Koszyk
                                </Link>
                            </Box>
                        </Notification>
                    )}
                    {!cartErrorMessage && <Box className={styles.checkout__content}>
                        <Box>
                            <RegistrationForm
                                isCheckout={true}
                                ref={childRef}
                                userFields={userFields}
                                lineItems={items}
                                shippingLines={shippingLines}
                            />
                        </Box>
                        <Box
                            className={`summary-wrapper ${styles.checkout__summary}`}
                        >
                            <Typography
                                variant="h2"
                                className={`main-title ${styles.checkout__title}`}
                            >
                                Twoje zamówienie
                            </Typography>
                            <Box className={styles.checkout__cart}>
                                <MiniCart
                                    lineItems={
                                        createdOrder &&
                                        createdOrder.line_items
                                    }
                                    showSubtotals={true}
                                    isLoading={isCreating}
                                />
                            </Box>
                            {items && (
                                <Box
                                    className={
                                        styles.checkout__total
                                    }
                                >
                                    <OrderTotals
                                        order={
                                            createdOrder &&
                                            createdOrder
                                        }
                                        includeBorders={false}
                                    />
                                </Box>
                            )}
                            <Box
                                className={
                                    styles.checkout__checkboxes
                                }
                            >
                                <CustomInput
                                    fieldName="Zaznaczam wszystkie zgody."
                                    name="checkbox1"
                                    isCheckbox={true}
                                    checked={checkboxes.checkbox1}
                                    onChange={handleCheckboxChange}
                                />
                                <CustomInput
                                    fieldName="Przeczytałem/am i akceptuję regulamin i polityka prywatności."
                                    name="checkbox2"
                                    isCheckbox={true}
                                    checked={checkboxes.checkbox2}
                                    onChange={handleCheckboxChange}
                                />
                                <CustomInput
                                    fieldName="Wyrażam zgodę na przetwarzanie danych osobowych."
                                    name="checkbox3"
                                    isCheckbox={true}
                                    checked={checkboxes.checkbox3}
                                    onChange={handleCheckboxChange}
                                />
                                <CustomInput
                                    fieldName="Wyrażam zgodę na przetwarzanie danych osobowych w celach marketingowych."
                                    name="checkbox4"
                                    isCheckbox={true}
                                    checked={checkboxes.checkbox4}
                                    onChange={handleCheckboxChange}
                                />
                                {errMessage && (
                                    <span className={"error"}>
                                        {errMessage}
                                    </span>
                                )}
                            </Box>
                            <button
                                onClick={onSubmitClick}
                                className={`btn-primary btn ${styles.checkout__button}`}
                                type="submit"
                            >
                                Kupuję i płacę
                            </button>
                        </Box>
                    </Box>}
                    {isModalOpen && (
                        <CheckoutLogin onContinueClick={onContinueClick} />
                    )}
                </Section>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) =>
{
    const result = await checkUserTokenInServerSide("/", context, "userToken");
    let userData = null;
    if (result && result.id)
    {
        try
        {
            const resp = await wooCommerceRestApi.get(`customers/${result.id}`);
            if (!("data" in resp)) userData = { error: "Server error" };
            userData = resp.data;
        } catch (err)
        {
            if (err instanceof Error)
            {
                userData = { error: err.message };
            } else
            {
                userData = { error: "Unknown error" };
            }
        }
    }

    if (result && result.redirect) return { props: { userData: userData } };

    return { props: { userData: userData } };
};

export default Checkout;
