import Box from '@mui/material/Box';
import { FC, useContext } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { wpMenuProps } from '@/types';
import { MenuSkeleton } from "../MenuSkeleton";
import { MenusContext } from '@/pages/_app';
import { MenuItemsType } from '@/types/Services/customApi/Menu/MenuItemsType';

const Nav: FC<wpMenuProps> = ({ menuId, className = "", skeleton }) => {
    const menus: MenuItemsType[] | undefined = useContext(MenusContext);
    const menuItems = menus?.find(({ id }) => id === menuId)?.items;

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
        <Box className={`${className && className}`}>
            <nav>
                <ul className={`list-reset ${styles.nav__list}`}>
                    {menuItems && menuItems.map(({ title, url }) => (
                        <li key={url}>
                            <Link className='desc nav-link link' href={url}>
                                {title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </Box >
    );
};

export default Nav;