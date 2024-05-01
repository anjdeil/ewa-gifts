import Box from '@mui/material/Box';
import { fetchMenuItems } from '@/services/NavServices';

const getFunc = async () =>
{
    const id = '358';
    const menuItems = await fetchMenuItems(id);
    console.log(menuItems);
}

const Nav = () =>
{
    return (
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
            <nav className="nav">
                <button onClick={getFunc}>
                    get
                </button>
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