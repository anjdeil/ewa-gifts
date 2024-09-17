import Link from "next/link";
import styles from "./styles.module.scss";
import { useCallback, useContext } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import MenuCategoriesSlice from "@/store/reducers/MenuCategoriesSlice";
import transformCategoriesMenu from '@/services/transformers/woocommerce/transformCategoriesMenu';
// import { useFetchCategoryListQuery } from '@/store/custom/customApi';
import { CategoryType } from "@/types/Services/customApi/Category/CategoryType";
import { AppContext } from "@/components/Layout/Layout";

export const CategoriesMenu = () =>
{
    const dispatch = useAppDispatch();
    const { isOpen, isCategoryActive } = useAppSelector(state => state.MenuCategoriesSlice);
    const popup = useAppSelector(state => state.Popup);
    const { setMenuOpen, setCategory } = MenuCategoriesSlice.actions;

    const context = useContext(AppContext);
    const categoriesData: CategoryType[] | undefined = context?.categories;
    const categories = categoriesData ? transformCategoriesMenu(categoriesData) : [];

    const onLinkClick = useCallback(() =>
    {
        if (isOpen)
        {
            dispatch(setMenuOpen(false));
            dispatch(setCategory(null));
        }
    }, [isOpen, dispatch, setMenuOpen, setCategory]);

    return (
        <div className={`${styles.categories} ${popup === "categories-menu" && `${styles.active} close-outside`}`}>
            <div className={styles['categories__list-wrapper']}>
                <ul className={styles['categories__list']}>
                    {categories.map((category) => (
                        <li key={category.id} className={styles['categories__list-item']}>
                            <Link href={category.url} passHref
                                className={`${styles['categories__link']} ${isCategoryActive === category.id ? styles['categories__link_active'] : ''} link desc`}
                                onMouseEnter={() => dispatch(setCategory(category.id))}
                                onClick={onLinkClick}
                            >
                                <span className={styles['categories__link-text']}>{category.categoryName}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={`${styles['categories__list-wrapper']} ${isCategoryActive ? styles.visible : styles.hidden}`}>
                <ul className={styles['categories__list']}>
                    {isCategoryActive && (
                        categories.find((category) => category.id === isCategoryActive)?.subcategories.map((subItem) => (
                            <li key={subItem.id} className={styles['categories__list-item']}>
                                <Link href={subItem.url} passHref className={`${styles['categories__link']} link desc`} onClick={onLinkClick}>
                                    <span className={styles['categories__link-text']}>{subItem.categoryName}</span>
                                </Link>
                            </li>
                        ))
                    )
                    }
                </ul>
            </div>
        </div >
    );
};

// export default CategoriesMenu;
