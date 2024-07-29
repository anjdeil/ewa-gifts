import React, { FC } from "react";
import styles from "./styles.module.scss";
import { OrderType } from "@/types/Services/woocommerce/OrderType";
import Link from "next/link";
import Image from "next/image";

interface AddressDetailsPropsType {
    order: OrderType
}

const AddressDetails: FC<AddressDetailsPropsType> = ({ order }) => {
    const { billing, shipping } = order;

    return (
        <div className={styles['address-details']}>
            <div className={styles['address-details__island']}>
                <div className={styles['address-details__header']}>
                    <Image className={styles['address-details__header-icon']} src={"/images/edit.svg"} height={24} width={24} unoptimized={true} alt="Adres płatności" />
                    Adres płatności
                </div>
                <div className={styles['address-details__content']}>
                    <div className={styles['address-details__row']}>
                        <div className={styles['address-details__label']}>Imię i nazwisko</div>
                        <div className={styles['address-details__value']}>
                            {billing?.first_name || billing?.last_name ? `${billing.first_name} ${billing.last_name}` : "—"}
                        </div>
                    </div>
                    <div className={styles['address-details__row']}>
                        <div className={styles['address-details__label']}>Nazwa firmy</div>
                        <div className={styles['address-details__value']}>
                            {billing?.company || "—"}
                        </div>
                    </div>
                    <div className={styles['address-details__row']}>
                        <div className={styles['address-details__label']}>Linia adresowa</div>
                        <div className={styles['address-details__value']}>
                            {billing?.address_1 || "—"}
                        </div>
                    </div>
                    {Boolean(billing?.address_2) && (
                        <div className={styles['address-details__row']}>
                            <div className={styles['address-details__label']}>Linia adresowa 2</div>
                            <div className={styles['address-details__value']}>
                                {billing.address_2}
                            </div>
                        </div>
                    )}
                    <div className={styles['address-details__row']}>
                        <div className={styles['address-details__label']}>Miasto</div>
                        <div className={styles['address-details__value']}>
                            {billing?.city || "—"}
                        </div>
                    </div>
                    <div className={styles['address-details__row']}>
                        <div className={styles['address-details__label']}>Kod pocztowy</div>
                        <div className={styles['address-details__value']}>
                            {billing?.postcode || "—"}
                        </div>
                    </div>
                    <div className={styles['address-details__row']}>
                        <div className={styles['address-details__label']}>Kraj/Region</div>
                        <div className={styles['address-details__value']}>
                            {billing?.country || "—"}
                        </div>
                    </div>

                    {Boolean(billing?.state) && (
                        <div className={styles['address-details__row']}>
                            <div className={styles['address-details__label']}>Państwo/Hrabstwo</div>
                            <div className={styles['address-details__value']}>
                                {billing.state}
                            </div>
                        </div>
                    )}
                    <div className={styles['address-details__row']}>
                        <div className={styles['address-details__label']}>Email</div>
                        <div className={styles['address-details__value']}>
                            {billing?.email ? <Link href={`mailto:${billing.email}`}>{billing.email}</Link> : "—"}
                        </div>
                    </div>
                    <div className={styles['address-details__row']}>
                        <div className={styles['address-details__label']}>Numer telefonu</div>
                        <div className={styles['address-details__value']}>
                            {billing?.phone ? <Link href={`tel:${billing.phone}`}>{billing.phone}</Link> : "—"}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles['address-details__island']}>
                <div className={styles['address-details__header']}>
                    <Image className={styles['address-details__header-icon']} src={"/images/edit.svg"} height={24} width={24} unoptimized={true} alt="Adres do wysyłki" />
                    Adres do wysyłki
                </div>
                <div className={styles['address-details__content']}>
                    <div className={styles['address-details__row']}>
                        <div className={styles['address-details__label']}>Imię i nazwisko</div>
                        <div className={styles['address-details__value']}>
                            {shipping?.first_name || shipping?.last_name ? `${shipping.first_name} ${shipping.last_name}` : "—"}
                        </div>
                    </div>
                    <div className={styles['address-details__row']}>
                        <div className={styles['address-details__label']}>Nazwa firmy</div>
                        <div className={styles['address-details__value']}>
                            {shipping?.company || "—"}
                        </div>
                    </div>
                    <div className={styles['address-details__row']}>
                        <div className={styles['address-details__label']}>Linia adresowa</div>
                        <div className={styles['address-details__value']}>
                            {shipping?.address_1 || "—"}
                        </div>
                    </div>
                    {Boolean(shipping?.address_2) && (
                        <div className={styles['address-details__row']}>
                            <div className={styles['address-details__label']}>Linia adresowa 2</div>
                            <div className={styles['address-details__value']}>
                                {shipping.address_2}
                            </div>
                        </div>
                    )}
                    <div className={styles['address-details__row']}>
                        <div className={styles['address-details__label']}>Miasto</div>
                        <div className={styles['address-details__value']}>
                            {shipping?.city || "—"}
                        </div>
                    </div>
                    <div className={styles['address-details__row']}>
                        <div className={styles['address-details__label']}>Kod pocztowy</div>
                        <div className={styles['address-details__value']}>
                            {shipping?.postcode || "—"}
                        </div>
                    </div>
                    <div className={styles['address-details__row']}>
                        <div className={styles['address-details__label']}>Kraj/Region</div>
                        <div className={styles['address-details__value']}>
                            {shipping?.country || "—"}
                        </div>
                    </div>

                    {Boolean(shipping?.state) && (
                        <div className={styles['address-details__row']}>
                            <div className={styles['address-details__label']}>Państwo/Hrabstwo</div>
                            <div className={styles['address-details__value']}>
                                {shipping.state}
                            </div>
                        </div>
                    )}
                    <div className={styles['address-details__row']}>
                        <div className={styles['address-details__label']}>Numer telefonu</div>
                        <div className={styles['address-details__value']}>
                            {shipping?.phone ? <Link href={`tel:${shipping.phone}`}>{shipping.phone}</Link> : "—"}
                        </div>
                    </div>
                    <div className={styles['address-details__row']}>
                        <div className={styles['address-details__label']}>Uwagi do zamówienia</div>
                        <div className={styles['address-details__value']}>
                            {order?.customer_note || "—"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressDetails;