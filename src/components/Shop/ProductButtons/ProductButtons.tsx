import React, { FC } from "react";
import { EwaButton } from "@/components/EwaComponents/EwaButton";
import styles from "./styles.module.scss";
import Link from "next/link";

interface ProductButtonsPropsType {
    hasAdded?: boolean,
    quantitiesMatch?: boolean,
    onAdd: () => void
}

const ProductButtons: FC<ProductButtonsPropsType> = ({ hasAdded = false, quantitiesMatch = true, onAdd }) => {

    return (
        <div className={styles['product-buttons']}>
            {
                (hasAdded && quantitiesMatch) ?
                    <>
                        <p className="text-gray">Produkt został dodany do koszyka</p>
                        <Link
                            href="/cart"
                            className={`desc link btn-secondary ${styles['product-buttons__secondary-button']}`}
                        >
                            Zobacz koszyk
                        </Link>
                    </> :
                    <EwaButton onClick={() => onAdd()}>
                        {(hasAdded && !quantitiesMatch) ?
                            <>Aktualizuj ilość</> :
                            <>Do koszyka</>
                        }
                    </EwaButton>
            }
        </div>
    );
}

export default ProductButtons;