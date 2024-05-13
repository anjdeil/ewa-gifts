import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchBar from '../SearchBar';
import Image from 'next/image';
import styles from './Header.module.scss';
// import Skeleton from '@mui/material/Skeleton';
// import { RenderIconButtonProps } from '@/types';
import { IconButton } from '@mui/material';
import { categoriesItems } from './cat';
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import MenuCategoriesSlice from "@/store/reducers/MenuCategoriesSlice";
import { CategoriesMenu } from '../CategoriesMenu';
import Badge from '@mui/material/Badge';


const Header: React.FC = () => 
{
    // const [iconLoading, setLoaded] = React.useState(false);

    // const handleIconLoad = () =>
    // {
    //     setLoaded(true);
    // }

    const dispatch = useAppDispatch();
    const { setMenuOpen, setCategory } = MenuCategoriesSlice.actions;
    const { isOpen } = useAppSelector(state => state.MenuCategoriesSlice);

    const onBurgerClick = () =>
    {
        console.log('works');
        if (!isOpen)
        {
            dispatch(setMenuOpen(true));
        } else
        {
            dispatch(setMenuOpen(false))
            dispatch(setCategory(null));
        }
    }
    // const renderIconButton = ({ src, alt, width, height, ...other }: RenderIconButtonProps): JSX.Element => (
    //     <>
    //         {iconLoading ? (
    //             <IconButton {...other}>
    //                 <Image
    //                     src={src}
    //                     alt={alt}
    //                     width={width}
    //                     height={height}
    //                     onLoad={handleIconLoad}
    //                 />
    //             </IconButton>
    //         ) : (
    //             <Skeleton variant="circular" sx={{ marginRight: '20px' }} >
    //                 <Image src={src} alt={''} width={width} height={height} onLoad={handleIconLoad} />
    //             </Skeleton>

    //         )}
    //     </>
    // );
    return (
        <Box sx={{ flexGrow: 1 }}>
            <CategoriesMenu categoriesItems={categoriesItems} />
            <AppBar position="static" className={styles.header}>
                <Toolbar sx={{ gap: '30px', justifyContent: 'space-between', minHeight: '100%!important' }}>
                    <Box display={'flex'} alignItems={'center'} gap={"15px"} sx={{ minHeight: 'auto' }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label='open drawer'
                            onClick={onBurgerClick}
                            sx={{ padding: '0' }}
                        >
                            <Image
                                src={'/images/hamburger.svg'}
                                alt={'Menu hamburger for categories'}
                                width={30}
                                height={30}
                            />
                        </IconButton>
                        <h3 className={styles['header__category-title']} style={{ margin: '0' }}>
                            Katalog
                        </h3>
                    </Box>
                    <Box className={styles['header__search-wrapper']} sx={{ flexGrow: 1 }}>
                        <SearchBar />
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex', alignItems: "center" } }}>
                        <IconButton>
                            <Image
                                src={'/images/account.svg'}
                                alt={'Account of current user'}
                                width={24}
                                height={24}
                            />
                        </IconButton>
                        <IconButton>
                            <Image
                                src={'/images/like.svg'}
                                alt={'My Favorites products button-icon'}
                                width={24}
                                height={24}
                            />
                        </IconButton>
                        <IconButton>
                            <Badge badgeContent={4} color="secondary">
                                <Image
                                    src={'/images/shop.svg'}
                                    alt={'Shop button-icon'}
                                    width={24}
                                    height={24}
                                />
                            </Badge>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box >
    );
}

export default Header;