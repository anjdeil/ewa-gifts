import React from 'react';
import SearchBar from '@/components/Layouts/SearchBar';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import MenuCategoriesSlice from "@/store/reducers/MenuCategoriesSlice";
import { CategoriesMenu } from '../CategoriesMenu';
import CatalogButton from '../CatalogButton';
import HeaderIconButtons from '../HeaderIconButtons';

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const { setMenuOpen, setCategory } = MenuCategoriesSlice.actions;
    const { isOpen } = useAppSelector(state => state.MenuCategoriesSlice);

    const onBurgerClick = () => {
        if (!isOpen) {
            dispatch(setMenuOpen(true));
        } else {
            dispatch(setMenuOpen(false))
            dispatch(setCategory(null));
        }
    }

    return (
        <div className={styles.headerWrapper}>
            <CategoriesMenu />
            <div className={`${styles.header} container`}>
                <div className={styles.header__catalogButton}>
                    <CatalogButton onClick={onBurgerClick} />
                </div>
                <div className={styles.header__search}>
                    <SearchBar />
                </div>

                {/* <Box className={styles['header__search-wrapper']} sx={{ flexGrow: 1 }}> */}
                {/* </Box> */}
                <div className={styles.header__icons}>
                    <HeaderIconButtons />
                </div>
            </div>
        </div>
    );
}

export default Header;