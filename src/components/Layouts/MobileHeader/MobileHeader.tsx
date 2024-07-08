import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { MobileSearchButton } from '@/components/Layouts/SearchBar';
import Image from 'next/image';
import styles from './styles.module.scss';
import { IconButton, Box } from '@mui/material';
import { CategoriesMenu } from '../CategoriesMenu';
import Link from 'next/link';

const MobileHeader: React.FC = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <CategoriesMenu />
            <AppBar position="static" className={styles.header}>
                <Toolbar sx={{ gap: '30px', justifyContent: 'space-between', minHeight: '100%!important' }}>
                    <Link href={'/'} passHref>
                        <Image src="/logo.svg" alt="Logo" width={70} height={20} />
                    </Link>
                    <Box className={styles['header__search-wrapper']} sx={{ flexGrow: 1 }}>
                        <MobileSearchButton />
                    </Box>
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
                </Toolbar>
            </AppBar>
        </Box >
    );
}

export default MobileHeader;