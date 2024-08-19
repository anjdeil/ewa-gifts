import { wpMenuProps } from "@/types/layouts/Menus";
import { FC, useContext } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { MenuSkeleton } from "../MenuSkeleton";
import { MenuItemsType } from "@/types/Services/customApi/Menu/MenuItemsType";
import Image from "next/image";
import { MenusContext } from "@/components/Layout/Layout";

const Socials: FC<wpMenuProps> = ({ menuId, className, skeleton }) => {
    const menus: MenuItemsType[] | undefined = useContext(MenusContext);
    const menuItems = menus?.find(({ id }) => id === menuId)?.items;

    const iconLinks = menuItems?.filter(({ fa_icon_code }) => fa_icon_code.length > 0) || [];
    const otherLinks = menuItems?.filter(({ fa_icon_code }) => fa_icon_code.length === 0) || [];

    if (!menuItems && skeleton) {
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
                    {Boolean(otherLinks?.length) && otherLinks.map(({ title, is_button, url }) => {
                        switch (true) {
                            case is_button:
                                return (
                                    <Link key={title} className={`desc link btn-primary`} href={url}>
                                        {title}
                                    </Link>
                                )

                            case url === '':
                                return (
                                    <p key={title} className={`desc`}>
                                        {title}
                                    </p>
                                )

                            default:
                                return (
                                    <Link key={title} className={`desc link nav-link `} href={url}>
                                        {title}
                                    </Link>
                                );
                        }
                    })}
                    {Boolean(iconLinks?.length) &&
                        <div className={styles.socials__icons}>
                            {iconLinks.map(({ fa_icon_code, url }) =>
                                <Link key={fa_icon_code} target="_blank" className={`link`} href={url}>
                                    <Image width={24} height={24} src={`/images/socials/${fa_icon_code}.svg`} alt={fa_icon_code} />
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