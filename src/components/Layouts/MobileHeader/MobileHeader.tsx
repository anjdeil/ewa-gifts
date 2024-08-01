import React, { FC } from 'react';
import { MobileSearchButton } from '@/components/Layouts/SearchBar';
import Image from 'next/image';
import styles from './styles.module.scss';
import { IconButton } from '@mui/material';
import Link from 'next/link';

const MobileHeader: FC = () => {
    return (
        <div className={styles.headerWrapper}>
            <div className={`${styles.header} container`}>
                <div className={styles.header__logo}>
                    <Link href={'/'} passHref>
                        <Image src="/logo.svg" alt="Logo" width={70} height={30} unoptimized={true} />
                    </Link>
                </div>
                <div className={styles.header__searchWrapper}>
                    <MobileSearchButton />
                </div>
                <div className={styles.header__iconButton}>
                    <IconButton>
                        <Link href={'tel:+48459568017'}>
                            <Image
                                src={'/images/phone.svg'}
                                alt={'Phone icon'}
                                width={24}
                                height={24}
                            />
                        </Link>
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default MobileHeader;