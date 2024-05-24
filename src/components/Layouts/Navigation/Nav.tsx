import Box from '@mui/material/Box';
import { FC } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useFetchMenuItemsQuery } from '@/store/wordpress';
import { wpMenuProps } from '@/types';
import { MenuSkeleton } from "../MenuSkeleton";

const Nav: FC<wpMenuProps> = ({ menuId, className, skeleton }) =>
{
    const { isError, error, isLoading, data } = useFetchMenuItemsQuery({ menus: `${menuId}` });

    isError && console.error(error)

    if (isLoading && skeleton)
    {
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
                    {data && data.map((link, index) => (
                        <Link key={index} className='desc nav-link link' href={link.url}>
                            {link.title}
                        </Link>
                    ))}
                </ul>
            </nav>
        </Box >

    );

};

export default Nav;