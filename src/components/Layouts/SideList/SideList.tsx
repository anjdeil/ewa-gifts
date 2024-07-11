import React, { FC } from "react";
import Link from 'next/link';
import Image from 'next/image';
import styles from "./styles.module.scss";

export type SideListLinkType = {
    name: string,
    url: string,
    imageUrl: string,
    isActive: boolean
};

interface SideListPropsType {
    links: SideListLinkType[]
}

const SideList: FC<SideListPropsType> = ({ links }) => {
    return (
        <nav className={styles['side-list']}>
            <ul className={styles['side-list__list']}>
                {Boolean(links.length) && links.map(({ name, url, imageUrl, isActive }) => (
                    <li key={name} className={styles["side-list__list-item"]}>
                        <Link
                            href={url}
                            className={`${styles["side-list__button"]} ${isActive && styles["side-list__button_active"]}`}
                        >
                            {Boolean(imageUrl) &&
                                <Image
                                    alt={name}
                                    className={styles['side-list__button-icon']}
                                    src={imageUrl}
                                    width={24}
                                    height={24}
                                />
                            }
                            <span className={styles['side-list__button-name']}>
                                {name}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default SideList;