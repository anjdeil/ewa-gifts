import { wpMenuProps } from "@/types/layouts/Menus";
import { FC } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { useFetchMenuItemsQuery } from '@/store/wordpress';
import { MenuSkeleton } from "../MenuSkeleton";
import { WpWooError } from "@/types";

const Socials: FC<wpMenuProps> = ({ menuId, className, skeleton }) => {
    const { isError, error, isLoading, data } = useFetchMenuItemsQuery({ menus: `${menuId}` });
    const iconLinks = data?.filter(link => link.isIcon.length > 0) || [];
    const otherLinks = data?.filter(link => link.isIcon.length === 0) || [];

    if (isError) {
        return <p>{(error as WpWooError).data.message}</p>;
    }

    if (isLoading && skeleton) {
        return (
            <MenuSkeleton
                elements={skeleton.elements}
                isColumn={skeleton.isColumn}
                width={skeleton.width}
                height={skeleton.height}
                gap={skeleton.gap}
            />
        )
    }

    return (
        <div className={`${styles.socials} ${className && className}`}>
            <nav className="nav">
                <ul className={`list-reset ${styles.socials__list}`}>
                    {Boolean(otherLinks?.length) && otherLinks.map((link, index) => {
                        switch (true) {
                            case link.isButton:
                                return (
                                    <Link key={index} className={`desc link btn-primary`} href={link.url}>
                                        {link.title}
                                    </Link>
                                )

                            case link.url === '':
                                return (
                                    <p key={index} className={`desc`}>
                                        {link.title}
                                    </p>
                                )

                            default:
                                return (
                                    <Link key={index} className={`desc link nav-link `} href={link.url}>
                                        {link.title}
                                    </Link>
                                );
                        }
                    })}
                    {Boolean(iconLinks?.length) &&
                        <div className={styles.footer__icons}>
                            {iconLinks.map((link, index) =>
                                <Link key={index} className={`link`} href={link.url}>
                                    {link.isIcon}
                                </Link>
                            )}
                        </div>
                    }
                </ul>
            </nav>
        </div >
    );
};

export default Socials;