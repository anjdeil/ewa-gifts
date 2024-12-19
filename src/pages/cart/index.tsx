import Head from "next/head";
import { useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useCreateOrderWoo } from "@/hooks/useCreateOrderWoo";
import { Section } from "@/components/Layouts/Section";
import styles from './styles.module.scss';
import { CartSummary } from "@/components/Cart/CartSummary";
import { CartTable } from "@/components/Cart/CartTable";
import Notification from "@/components/Layouts/Notification";
import { PageHeader } from "@/components/Layouts/PageHeader";
import Link from "next/link";
import { lineOrderItems } from "@/types/store/reducers/CartSlice";
import { OrderType } from "@/types/Services/woocommerce/OrderType";
import { CartItem } from "@/types/Cart";
import { useFetchProductsCirculationsMutation } from "@/store/custom/customApi";
import checkCartConflict from "@/Utils/checkCartConflict";
import getSubtotalByLineItems from "@/Utils/getSubtotalByLineItems";
import formatPrice from "@/Utils/formatPrice";
import { MIN_SUBTOTAL_TO_CHECKOUT } from "@/Utils/consts";
import { compactCartItems } from "@/services/transformers/checkout";

const breadLinks = [{ name: 'Koszyk', url: '/cart' }];

function Cart()
{
  const { items, shippingLines } = useAppSelector(state => state.Cart);
  const { createOrder, error: createError, createdOrder } = useCreateOrderWoo();
  const [fetchProductsCirculations, { data: productsSpecsData, isLoading: isProductsSpecsLoading }] = useFetchProductsCirculationsMutation();
  const productsSpecs = productsSpecsData?.data ? productsSpecsData.data.items : [];
  const [lineItems, setLineItems] = useState<lineOrderItems[]>([]);
  const [currentOrder, setCurrentOrder] = useState<OrderType | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() =>
  {
    /* Fetch create order */
    setCartItems(items);
    setIsUpdating(true);
    createOrder(items, 'pending', shippingLines);

    /* Fetch circulations */
    const shortenedCartItems = compactCartItems(items);
    fetchProductsCirculations({
      products: shortenedCartItems
    });
  }, [items]);

  useEffect(() =>
  {
    if (createdOrder && createdOrder.line_items)
    {
      setCurrentOrder(createdOrder);
      setLineItems(createdOrder.line_items);
      setIsUpdating(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdOrder])

  useEffect(() =>
  {
    if (createError)
    {
      setIsUpdating(false);
    }
  }, [createError]);

  const isCartConflict = checkCartConflict(cartItems, productsSpecs);

  const subtotal = lineItems ? getSubtotalByLineItems(lineItems) : null;
  const isInsufficient = subtotal ? subtotal < MIN_SUBTOTAL_TO_CHECKOUT : false;
  const insufficientAmount = subtotal ? formatPrice(MIN_SUBTOTAL_TO_CHECKOUT - subtotal) : null;

  return (
    <>
      <Head>
        <title>Koszyk - Ewa Gifts</title>
        <meta name="description" content={`This is cart page`} />
        <meta name="robots" content="noindex" />
      </Head>
      <main>
        <Section className="section" isContainer={true}>
          <PageHeader title={"Koszyk"} breadLinks={breadLinks} />
          {!cartItems.length && !isUpdating ?
            <Notification>
              <Box className={styles.Cart__notification}>
                <p>
                  Twój koszyk aktualnie jest pusty.
                </p>
                <p>
                  <Link href={"/"}>Powrót do sklepu</Link>
                </p>
              </Box>
            </Notification> :
            createError ?
              <Notification type="warning">{createError}</Notification> :
              <Box className={styles.Cart__content}>
                <Box>
                  {isInsufficient &&
                    <Notification type="warning">Do złożenia zamówienia brakuje jeszcze {insufficientAmount}.</Notification>
                  }
                  <CartTable
                    lineItems={lineItems}
                    productsSpecs={productsSpecs}
                    cartItems={cartItems}
                    isLoading={isUpdating || isProductsSpecsLoading}
                  />
                  {/* <AddCoupon orderId={orderId && orderId} /> */}
                </Box>
                <CartSummary
                  order={currentOrder}
                  isLoading={isUpdating || isProductsSpecsLoading}
                  disabled={isCartConflict || isUpdating || isProductsSpecsLoading || isInsufficient}
                />
              </Box>
          }
        </Section>
      </main>
    </>
  );
}

export default Cart;