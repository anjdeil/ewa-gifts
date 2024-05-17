import Box from '@mui/material/Box';
import { wpNavLinks } from "@/types/Menus";
import { FC } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

interface NavProps
{
    navLinks: wpNavLinks;
}

const Nav: FC<NavProps> = ({ navLinks: { isLoading, data, isError, error } }) =>
{
    return (
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
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