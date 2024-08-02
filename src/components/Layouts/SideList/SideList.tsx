import React, { FC, ReactElement } from "react";
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
    links: SideListLinkType[],
    onClick?: (url: string) => void,
    includeArrows?: boolean
}

const SideList: FC<SideListPropsType> = ({ links, onClick, includeArrows = false }) => {

    const renderLinkInner = (imageUrl: string, name: string): ReactElement => (
        <>
            <div className={styles['side-list__button-content']}>
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
            </div>
            {includeArrows &&
                <span className={styles['side-list__button-arrow']}>
                    <svg aria-hidden width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L7 8L1 15" stroke="#B3B3B3" />
                    </svg>
                </span>
            }
        </>
    );

    return (
        <nav className={styles['side-list']}>
            <ul className={styles['side-list__list']}>
                {Boolean(links?.length) && links.map(({ name, url, imageUrl, isActive }) => (
                    <li key={name} className={styles["side-list__list-item"]}>
                        {onClick !== undefined ?
                            <button
                                onClick={() => onClick(url)}
                                className={`${styles["side-list__button"]} ${isActive && styles["side-list__button_active"]}`}
                            >
                                {renderLinkInner(imageUrl, name)}
                            </button> :
                            <Link
                                href={url}
                                className={`${styles["side-list__button"]} ${isActive && styles["side-list__button_active"]}`}
                            >
                                {renderLinkInner(imageUrl, name)}
                            </Link>
                        }
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default SideList;