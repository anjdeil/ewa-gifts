import Link from "next/link"
import styles from "./Categories.module.scss";
import { z } from "zod";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import MenuCategoriesSlice from "@/store/reducers/MenuCategoriesSlice";

const subcategories = z.object({
    id: z.number(),
    categoryName: z.string(),
    slug: z.string(),
});

const categoriesMenuSchema = subcategories.extend({
    subcategories: z.array(subcategories)
});

type categoriesMenu = z.infer<typeof categoriesMenuSchema>;

interface CategoriesMenuProps
{
    categoriesItems: categoriesMenu;
    isMenuOpen: boolean;
}

export const CategoriesMenu: FC<CategoriesMenuProps> = ({ categoriesItems }) =>
{
    const dispatch = useAppDispatch();
    const { setMenuOpen, setCategory } = MenuCategoriesSlice.actions;
    const { isOpen, isCategoryActive } = useAppSelector(state => state.MenuCategoriesSlice);

    const onLinkClick = () =>
    {
        if (isOpen)
        {
            dispatch(setMenuOpen(false));
            dispatch(setCategory(null));
        }
    }

    return (
        <div className={`${styles.categories} ${isOpen && styles.active}`}>
            <div className={styles['categories__list-wrapper']}>
                <ul className={styles['categories__list']}>
                    {
                        Object.values(categoriesItems).map((item) => (
                            <li key={item.id}
                                className={(isCategoryActive === item.id) ? styles.activeCategory : ''}
                            >
                                <Link href={item.slug}
                                    className="link desc"
                                    onMouseEnter={() => dispatch(setCategory(item.id))}
                                    onClick={onLinkClick}
                                >
                                    {item.categoryName}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className={[
                styles['categories__list-wrapper'],
                isCategoryActive ? styles['categories__list-wrapper_sub-active'] : styles['categories__list-wrapper_sub']
            ].join(' ')}>
                {
                    <ul className={[
                        styles[`categories__list`],
                        isCategoryActive ? styles['categories__list-wrapper_sub-active'] : styles['categories__list-wrapper_sub']
                    ].join(' ')}>
                        {isCategoryActive && Object.values(categoriesItems).map((item) => (
                            item.id === isCategoryActive && item.subcategories.map((subItem) => (
                                <li key={subItem.id}>
                                    <Link href={subItem.slug}
                                        className="link desc"
                                        onClick={onLinkClick}
                                    >
                                        {subItem.categoryName}
                                    </Link>
                                </li>
                            ))
                        ))}
                    </ul>
                }
            </div>

        </div >
    )
}
