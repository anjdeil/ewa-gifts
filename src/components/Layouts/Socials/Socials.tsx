import { wpMenuProps } from "@/types/layouts/Menus";
import { FC } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { useFetchMenuItemsQuery } from '@/store/wordpress';

const Socials: FC<wpMenuProps> = ({ menuId, className }) =>
{
    const { isError, error, isLoading, data } = useFetchMenuItemsQuery({ menus: `${menuId}` });

    const iconLinks = data?.filter(link => link.isIcon.length > 0) || [];
    const otherLinks = data?.filter(link => link.isIcon.length === 0) || [];

    return (
        <div className={`${styles.socials} ${className && className}`}>
            <nav className="nav">
                <ul className={`list-reset ${styles.socials__list}`}>
                    {isLoading && <p>Loading...</p>}
                    {isError && <p>{error}</p>}
                    {data &&
                        <>
                            {otherLinks.map((link, index) =>
                            {
                                switch (true)
                                {
                                    case link.isButton:
                                        return (
                                            <Link key={index} className={`desc link ${styles.socials__btn}`} href={link.url}>
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
                                            <Link key={index} className={`desc link`} href={link.url}>
                                                {link.title}
                                            </Link>
                                        );
                                }
                            })
                            }
                            <div className={styles.footer__icons}>
                                {iconLinks.map((link, index) =>
                                    <Link key={index} className={`link`} href={link.url}>
                                        {link.isIcon}
                                    </Link>
                                )}
                            </div>
                        </>
                    }
                </ul>
            </nav>
        </div >
    );
};

export default Socials;