import React from 'react';
import SearchBar from '@/components/Layouts/SearchBar';
import styles from './styles.module.scss';
import { useAppDispatch } from "@/hooks/redux";
import { CategoriesMenu } from '../CategoriesMenu';
import CatalogButton from '../CatalogButton';
import HeaderIconButtons from '../HeaderIconButtons';
import { popupToggle } from '@/store/reducers/PopupSlice';
import { useMediaQuery } from '@mui/material';
import TopBar from '../TopBar/TopBar';
import MobileHeader from '../MobileHeader/MobileHeader';

const Header: React.FC = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const dispatch = useAppDispatch();

    return (
        <div className={styles.headerTopBarWrapper}>
            {!isMobile && <TopBar />}
            {!isMobile ?
                <div className={styles.headerWrapper}>
                    <CategoriesMenu />
                    <div className={`${styles.header} container`}>
                        <div className={styles.header__catalogButton}>
                            <CatalogButton onClick={() => dispatch(popupToggle("categories-menu"))} />
                        </div>
                        <div className={styles.header__search}>
                            <SearchBar />
                        </div>
                        <div className={styles.header__icons}>
                            <HeaderIconButtons />
                        </div>
                    </div>
                </div>
                : <MobileHeader />}

        </div>
    );
}

export default Header;