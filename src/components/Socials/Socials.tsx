import Box from '@mui/material/Box';
import { wpNavLinksProps } from "@/modules";
import { FC } from 'react';

const Socials: FC<wpNavLinksProps> = ({ navLinks: { isLoading, data, isError, error } }) =>
{
    return (
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
            <nav className="nav">
                <ul className='social__list'>
                    {isLoading && <p>Loading...</p>}
                    {isError && <p>{error}</p>}
                    {data && data.map((link, index) => (
                        <li key={index}>
                            <a href={link.url}>{link.title}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </Box>

    );

};

export default Socials;