import Box from '@mui/material/Box';
import { wpNavLinksProps } from "@/modules";
import { FC } from 'react';
import styles from './Navigation.module.scss';

const Nav: FC<wpNavLinksProps> = ({ navLinks: { isLoading, data, isError, error } }) =>
{
    return (
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
            <nav>
                <ul className={styles['nav__list']}>
                    {isLoading && <p>Loading...</p>}
                    {isError && <p>{error}</p>}
                    {data && data.map((link, index) => (
                        <li key={index} className='desc'>
                            <a href={link.url}>{link.title}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </Box >

    );

};

export default Nav;