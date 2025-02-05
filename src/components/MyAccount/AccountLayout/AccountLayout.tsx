import SideList from "@/components/Layouts/SideList";
import React, { FC, ReactNode } from "react";
import styles from "../styles.module.scss";
import Head from "next/head";
import accountLinks from "./accountLinks";
import { BreadcrumbType } from "@/types/layouts/Breadcrumbs";
import { PageHeader } from "@/components/Layouts/PageHeader";

interface AccountLayoutPropsType
{
    title: string,
    children: ReactNode
    breadcrumbs?: BreadcrumbType[]
}

const AccountLayout: FC<AccountLayoutPropsType> = ({ title, children, breadcrumbs = [] }) =>
{

    const pagedAccountLinks = accountLinks.map((link) =>
    {
        if (link.name === title) return { ...link, isActive: true };
        else return link;
    });

    return (
        <>
            <Head>
                <title>{title} - Ewa Gifts</title>
            </Head>
            <main className={styles['my-account']}>
                <div className="container">
                    <PageHeader
                        title={title}
                        breadLinks={[{ name: 'Moje konto', url: '/my-account' }, ...breadcrumbs]} />
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