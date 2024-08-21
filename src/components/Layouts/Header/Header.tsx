import React from 'react';
import SearchBar from '@/components/Layouts/SearchBar';
import styles from './styles.module.scss';
import { useAppDispatch } from "@/hooks/redux";
import { CategoriesMenu } from '../CategoriesMenu';
import CatalogButton from '../CatalogButton';
import HeaderIconButtons from '../HeaderIconButtons';
import { popupToggle } from '@/store/reducers/PopupSlice';

const Header: React.FC = () =>
{
    const dispatch = useAppDispatch();

    return (
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
    );
}

export default Header;