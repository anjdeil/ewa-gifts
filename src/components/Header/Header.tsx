import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Badge from '@mui/material/Badge';
import SearchBar from '../SearchBar';
import Image from 'next/image';
import styles from './Header.module.scss';
import Skeleton from '@mui/material/Skeleton';
import { IconButton } from '@mui/material';

// type RenderIconButtonProps = IconButtonProps & ImageProps;

interface IconButtonProps
{
    src: string;
    alt: string;
    width: number;
    height: number;
    [key: string]: string | number;
}


type RenderIconButtonProps = IconButtonProps;


const Header: React.FC = () => 
{
    const [iconLoading, setLoaded] = React.useState(false);

    const handleIconLoad = () =>
    {
        setLoaded(true);
    }

    const renderIconButton = ({ src, alt, width, height, ...other }: RenderIconButtonProps): JSX.Element => (
        <>
            {iconLoading ? (
                <IconButton {...other} >
                    <Image
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        onLoad={handleIconLoad}
                    />
                </IconButton>
            ) : (
                <Skeleton variant="circular" sx={{ marginRight: '20px' }} >
                    <Image src={src} alt={''} width={width} height={height} onLoad={handleIconLoad} />
                </Skeleton>

            )}
        </>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className={styles.header}>
                <Toolbar sx={{ gap: '30px', justifyContent: 'space-between' }}>
                    <Box display={'flex'} alignItems={'center'}>
                        {renderIconButton({
                            src: '/images/hamburger.svg',
                            alt: 'Menu hamburger for categories',
                            width: 30,
                            height: 30,
                            size: "large",
                            edge: "start",
                            color: "inherit",
                            'aria-label': "open drawer",
                        })}
                        <h3 className={styles['header__category-title']} style={{ margin: '0' }}>
                            Katalog
                        </h3>
                    </Box>
                    <Box className={styles['header__search-wrapper']} sx={{ flexGrow: 1 }}>
                        <SearchBar />
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex', alignItems: "center" } }}>
                        {renderIconButton({
                            src: '/images/account.svg',
                            alt: 'Account of current user',
                            width: 40,
                            height: 40,
                        })}
                        {renderIconButton({
                            src: '/images/like.svg',
                            alt: 'My Favorites products button-icon',
                            width: 40,
                            height: 40,
                        })}
                        {renderIconButton({
                            src: '/images/shop.svg',
                            alt: 'Shop button-icon',
                            width: 40,
                            height: 40,
                        })}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box >
    );
}

export default Header;