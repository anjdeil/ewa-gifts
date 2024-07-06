import React, { FC } from "react";
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { CategoryType } from "@/types/Services/customApi/Category/CategoryType";

interface SubcategoriesListPropsType {
    categories?: CategoryType[],
    parent?: CategoryType,
    currentSubcategorySlug: string
}

const SubcategoriesList: FC<SubcategoriesListPropsType> = ({ categories, parent, currentSubcategorySlug }) => {

    const subcategories = categories?.filter(({ parent_id }) => parent_id === parent?.id);

    return (
        <nav className={styles['categories-list']}>
            <ul className={styles['categories-list__list']}>
                {subcategories && subcategories.map(({ id, name, slug }) => (
                    <li key={id} className={styles['categories-list__list-item']}>
                        <Link
                            href={`/product-category/${parent?.slug}/${slug}`}
                            className={`${styles['categories-list__button']} ${currentSubcategorySlug === slug ? styles['categories-list__button_active'] : ''}`}
                        >
                            <Image
                                alt={name}
                                className={styles['categories-list__button-icon']}
                                src={`/images/categories/${slug}.svg`}
                                width={24}
                                height={24}
                            />
                            <span className={styles['categories-list__button-name']}>
                                {name}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default SubcategoriesList;