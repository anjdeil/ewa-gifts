import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Layouts/Navigation/Nav";
import React from 'react';
import Socials from '../Socials/Socials';
import styles from './styles.module.scss';
const TopBar: React.FC = () => {
    return (
        <div className={styles.topBar}>
            <div className={`${styles.topBar__stack} container`}>
                <Link href={'/'} passHref className={styles.topBar__logoLink}>
                    <Image src="/logo.svg" className={styles.topBar__logoLinkImage} alt="Logo" width={150} height={40} />
                </Link>
                <Nav
                    menuId={816}
                    className={styles.topBar__nav}
                    skeleton={
                        {
                            elements: 5,
                            width: "90px",
                            height: "40px",
                            gap: '10px'
                        }
                    }
                />
                <Socials
                    menuId={358}
                    skeleton={
                        {
                            elements: 2,
                            width: "100px",
                            height: "40px",
                            gap: '20px'
                        }
                    }
                />
            </div>
        </div>
    )
}

export default TopBar;