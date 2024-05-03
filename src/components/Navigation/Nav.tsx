import Box from '@mui/material/Box';

const Nav = () =>
{
    return (
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
            <nav className="nav">
                {/* <ul>
                    {links.map((link, index) => (
                        <li key={index}>
                            <a href={link.url}>{link.title}</a>
                        </li>
                    ))}
                </ul> */}
            </nav>
        </Box>

    );

};

export default Nav;