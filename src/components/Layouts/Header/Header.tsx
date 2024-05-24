import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SearchBar, { MobileSearchButton } from '@/components/Layouts/SearchBar';
import Image from 'next/image';
import styles from './styles.module.scss';
import { IconButton, useMediaQuery, Box, styled } from '@mui/material';
import { categoriesItems } from './cat';
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import MenuCategoriesSlice from "@/store/reducers/MenuCategoriesSlice";
import { CategoriesMenu } from '../CategoriesMenu';
import Badge from '@mui/material/Badge';
import { useFetchAllCategoriesListQuery } from '@/store/wooCommerce/wooCommerceApi';

const CustomBadge = styled(Badge)`
.css-1abqjyq-MuiBadge-badge {
    background-color: #FECB00;
    color: black;
}
},
`;

const Header: React.FC = () =>
{
    // const { data, isLoading, isError, error } = useFetchAllCategoriesListQuery();
    // console.log(data);

    const isMobile = useMediaQuery('(max-width: 768px)');
    const dispatch = useAppDispatch();
    const { setMenuOpen, setCategory } = MenuCategoriesSlice.actions;
    const { isOpen } = useAppSelector(state => state.MenuCategoriesSlice);

    const onBurgerClick = () =>
    {
        if (!isOpen)
        {
            dispatch(setMenuOpen(true));
        } else
        {
            dispatch(setMenuOpen(false))
            dispatch(setCategory(null));
        }
    }

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
                        <h3 className={'desc'} style={{ margin: '0' }}>
                            Katalog
                        </h3>
                    </Box>
                    <Box className={styles['header__search-wrapper']} sx={{ flexGrow: 1 }}>
                        {
                            !isMobile ? (
                                <SearchBar />
                            ) : (
                                <MobileSearchButton />
                            )
                        }
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex', alignItems: "center", gap: '40px' } }}>
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
                            <CustomBadge badgeContent={4} color="secondary">
                                <Image
                                    src={'/images/shop.svg'}
                                    alt={'Shop button-icon'}
                                    width={24}
                                    height={24}
                                />
                            </CustomBadge>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box >
    );
}

export default Header;

// const [iconLoading, setLoaded] = React.useState(false);

// const handleIconLoad = () =>
// {
//     setLoaded(true);
// }