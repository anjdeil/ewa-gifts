import Link from "next/link";
import styles from "./styles.module.scss";
import { FC, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import MenuCategoriesSlice from "@/store/reducers/MenuCategoriesSlice";
import { Category } from "@/types";

interface CategoriesMenuProps
{
    categoriesItems: Category[];
}

export const CategoriesMenu: FC<CategoriesMenuProps> = ({ categoriesItems }) =>
{
    const dispatch = useAppDispatch();
    const { isOpen, isCategoryActive } = useAppSelector(state => state.MenuCategoriesSlice);
    const { setMenuOpen, setCategory } = MenuCategoriesSlice.actions;

    const onLinkClick = useCallback(() =>
    {
        if (isOpen)
        {
            dispatch(setMenuOpen(false));
            dispatch(setCategory(null));
        }
    }, [isOpen, dispatch, setMenuOpen, setCategory]);

    return (
        <div className={`${styles.categories} ${isOpen && styles.active}`}>
            <div className={styles['categories__list-wrapper']}>
                <ul className={styles['categories__list']}>
                    {categoriesItems.map((category) => (
                        <li key={category.id} className={isCategoryActive === category.id ? styles.activeCategory : ''}>
                            <Link href={category.slug} passHref
                                className="link desc"
                                onMouseEnter={() => dispatch(setCategory(category.id))}
                                onClick={onLinkClick}
                            >
                                {category.categoryName}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={`${styles['categories__list-wrapper']} ${isCategoryActive ? styles.visible : styles.hidden}`}>
                <ul className={`${styles['categories__list']} ${isCategoryActive ? styles.visible : styles.hidden}`}>
                    {isCategoryActive && (
                        categoriesItems.find((category) => category.id === isCategoryActive)?.subcategories.map((subItem) => (
                            <li key={subItem.id} className={`${isCategoryActive ? styles.visible : styles.hidden}`}>
                                <Link href={subItem.slug} passHref className="link desc" onClick={onLinkClick}>
                                    {subItem.categoryName}
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
