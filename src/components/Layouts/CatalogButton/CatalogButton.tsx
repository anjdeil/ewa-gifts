import Image from "next/image";
import { FC } from "react";
import styles from "./styles.module.scss";

interface CatalogButtonPropsType {
    onClick: () => void
}

const CatalogButton: FC<CatalogButtonPropsType> = ({ onClick }) => {
    return (
        <button onClick={onClick} className={styles["catalog-button"]}>
            <Image className={styles["catalog-button__icon"]} src={'/images/catalog-button.svg'} width={20} height={20} alt="Menu" />
            <span className={styles["catalog-button__text"]}>Kategorie</span>
        </button>
    )
}

export default CatalogButton;