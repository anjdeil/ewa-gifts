import React from 'react';
import FilterCollapsed from './FilterCollapsed';
import { useFetchAllCategoriesListQuery } from '@/store/wooCommerce/wooCommerceApi';
import transformCategoriesMenu from '@/services/transformers/woocommerce/transformCategoriesMenu';
import { useParams } from 'next/navigation';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const ShopSidebar = () => {

    const { slugs } = useParams();
    const [categorySlug, subcategorySlug] = slugs;

    const { data = [], isLoading, isError, error } = useFetchAllCategoriesListQuery();
    const categories = data.length ? transformCategoriesMenu(data) : [];

    const targetCategory = categories.find(({ slug }) => slug === categorySlug);

    return (
        <>
            <FilterCollapsed title={targetCategory?.categoryName} collapsed={false}>
                <nav className={styles['categories-list']}>
                    <ul className={styles['categories-list__list']}>
                        {targetCategory && targetCategory.subcategories.map(({ id, categoryName, slug }) => (
                            <li key={id} className={styles['categories-list__list-item']}>
                                <Link
                                    href={`/product-category/${targetCategory.slug}/${slug}`}
                                    className={`${styles['categories-list__button']} ${subcategorySlug === slug ? styles['categories-list__button_active'] : ''}`}
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
            </FilterCollapsed>
        </>
    )
}

export default ShopSidebar;