import { EwaButton } from "@/components/EwaComponents/EwaButton";
import Link from "next/link";
import { FC } from "react";
import styles from "./styles.module.scss";

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
                    <EwaButton onClick={() => onAdd()} className={styles['product-buttons__main-button']}>
                        {(hasAdded && !quantitiesMatch) ?
                            <>Aktualizuj ilość</> :
                            <>Dodaj do koszyka</>
                        }
                    </EwaButton>
            }
        </div>
    );
}

export default ProductButtons;