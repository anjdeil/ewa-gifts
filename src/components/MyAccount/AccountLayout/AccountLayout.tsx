import SideList from "@/components/Layouts/SideList";
import React, { FC, ReactNode } from "react";
import styles from "../styles.module.scss";
import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import Head from "next/head";
import accountLinks from "./accountLinks";
import { BreadcrumbType } from "@/types/layouts/Breadcrumbs";

interface AccountLayoutPropsType {
    title: string,
    children: ReactNode
    breadcrumbs?: BreadcrumbType[]
}

const AccountLayout: FC<AccountLayoutPropsType> = ({ title, children, breadcrumbs = [] }) => {

    const pagedAccountLinks = accountLinks.map((link) => {
        if (link.name === title) return { ...link, isActive: true };
        else return link;
    });

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <main className={styles['my-account']}>
                <div className="container">
                    <div className="page-top page-top_center">
                        <Breadcrumbs links={[
                            { name: 'Moje konto', url: '/my-account' },
                            ...breadcrumbs
                        ]} />
                        <div className="page-top__titling">
                            <h1 className="page-top__title">{title}</h1>
                        </div>
                    </div>
                    <div className={styles['my-account__container']}>
                        <aside className={styles['my-account__sidebar']}>
                            <SideList links={pagedAccountLinks} />
                        </aside>
                        <div className={styles['my-account__content']}>
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AccountLayout;