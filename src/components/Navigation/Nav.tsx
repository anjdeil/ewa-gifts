import { NavPropsType } from "@/types/header";
import './style.scss';
import { Box, List, ListItem, Link } from '@mui/material';



const Nav = ({ links }: NavPropsType) =>
{
    return (
        <nav className="nav">
            <List className="nav__list">
                {links.map((link, index) => (
                    <ListItem key={index}>
                        <Link href={link.url}>{link.title}</Link>
                    </ListItem>
                ))}
            </List>
        </nav>
    );
};

export default Nav;