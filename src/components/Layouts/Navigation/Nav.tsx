import Box from '@mui/material/Box';
import { FC } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useFetchMenuItemsQuery } from '@/store/wordpress';
import { wpMenuProps } from '@/types';

const Nav: FC<wpMenuProps> = ({ menuId, className }) =>
{
    const { isError, error, isLoading, data } = useFetchMenuItemsQuery({ menus: `${menuId}` });

    return (
        <Box className={`${className && className}`}>
            <nav>
                <ul className={`list-reset ${styles.nav__list}`}>
                    {isLoading && <p>Loading...</p>}
                    {isError && <p>{error}</p>}
                    {data && data.map((link, index) => (
                        <Link key={index} className='desc link' href={link.url}>
                            {link.title}
                        </Link>
                    ))}
                </ul>
            </nav>
        </Box >

    );

};

export default Nav;