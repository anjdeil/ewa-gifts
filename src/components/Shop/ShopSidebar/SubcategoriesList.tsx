import React from "react";
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const SubcategoriesList = ({ targetCategory, currentSubcategorySlug }) => {

    return (
        <nav className={styles['categories-list']}>
            <ul className={styles['categories-list__list']}>
                {targetCategory && targetCategory.subcategories.map(({ id, categoryName, slug }) => (
                    <li key={id} className={styles['categories-list__list-item']}>
                        <Link
                            href={`/product-category/${targetCategory.slug}/${slug}`}
                            className={`${styles['categories-list__button']} ${currentSubcategorySlug === slug ? styles['categories-list__button_active'] : ''}`}
                        >
                            <Image
                                alt={categoryName}
                                className={styles['categories-list__button-icon']}
                                src={`/images/categories/${slug}.svg`}
                                width={24}
                                height={24}
                            />
                            <span className={styles['categories-list__button-name']}>
                                {categoryName}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default SubcategoriesList;