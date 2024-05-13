import Box from '@mui/material/Box';
import { wpNavLinks } from "@/modules";
import { FC } from 'react';
import Link from 'next/link';
import styles from './Socials.module.scss';

interface SocialsProps
{
    links: wpNavLinks;
}

const isBtn = true;

const Socials: FC<SocialsProps> = ({ links: { isLoading, data, isError, error } }) =>
{
    return (
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
            <nav className="nav">
                <ul className={`list-reset ${styles.socials__list}`}>
                    {isLoading && <p>Loading...</p>}
                    {isError && <p>{error}</p>}
                    {data && data.map((link, index) => (
                        <Link key={index} className={`desc link ${isBtn && styles.socials__btn}`} href={link.url}>
                            {link.title}
                        </Link>
                    ))}
                </ul>
            </nav>
        </Box >

    );

};

export default Socials;