import React, { FC, useState } from "react";
import MobilePopup from "../MobilePopup";
import { useFetchCategoryListQuery } from "@/store/custom/customApi";
import { CategoryType } from "@/types/Services/customApi/Category/CategoryType";
import SideList from "@/components/Layouts/SideList";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

interface MobileCategoriesMenuPropsType {
    onClose: () => void
}

const MobileCategoriesMenu: FC<MobileCategoriesMenuPropsType> = ({ onClose }) => {
    const [parent, setParent] = useState<{ id: number, name: string, slug: string } | undefined>();
    const { data: categoriesData } = useFetchCategoryListQuery({});
    const categories = categoriesData?.data && categoriesData.data.items as CategoryType[];
    const router = useRouter();

    const renderTitle = (title: string) => (
        <div className={styles["mobile-categories__title-wrapper"]}>
            <button onClick={() => setParent(undefined)} className={styles["mobile-categories__back"]}>
                <svg aria-hidden width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1L1 8M1 8L7 15M1 8H17" stroke="black" />
                </svg>
            </button>
            <div className={styles["mobile-categories__title"]}>{title}</div>
        </div>
    )

    const handleClick = (slug: string) => {
        if (!parent) {
            setParent(categories?.find((category: CategoryType) => category.slug === slug && category.parent_id === 0));
        } else {
            router.push(`/product-category/${parent.slug}/${slug}`)
            onClose();
        }
    }

    const filteredCategories = categories?.filter((category: CategoryType) => {
        if (category.slug === "uncategorized") return false;

        if (parent !== undefined) {
            return category.parent_id === parent.id;
        } else {
            return category.parent_id === 0;
        }
    });

    const categoriesLinks = filteredCategories?.map(({ name, slug }: CategoryType) => ({
        name,
        url: slug,
        imageUrl: `/images/categories/${slug}.svg`,
        isActive: false
    }));

    return (
        <MobilePopup onClose={onClose} title={parent && renderTitle(parent.name)}>
            <div className={styles["mobile-categories"]}>
                <SideList links={categoriesLinks} onClick={handleClick} includeArrows={!parent} />
            </div>
        </MobilePopup>
    );
}

export default MobileCategoriesMenu;