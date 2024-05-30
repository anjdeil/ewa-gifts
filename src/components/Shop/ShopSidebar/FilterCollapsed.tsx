import { Button, Collapse } from '@mui/material';
import React, { useState } from 'react';
import variables from '@/styles/variables.module.scss';
import styles from './styles.module.scss';

const FilterCollapsed = ({ title, children, collapsed }) => {
    const [isCollapsed, setCollapsed] = useState(collapsed);

    return (
        <div className={styles['filter-collapsed']}>
            <Button
                className={`${styles['filter-collapsed__header']} ${!isCollapsed && styles['filter-collapsed__header_expanded']}`}
                sx={{
                    backgroundColor: variables.whiteLilac,
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    textTransform: 'none',
                    color: variables.blackColor,
                    borderRadius: '10px',
                    padding: '0.7em 0.6em',
                    width: '100%',
                    textAlign: 'left',
                    justifyContent: 'space-between',
                    '&:hover': {
                        backgroundColor: variables.inputLight,
                    }
                }}
                onClick={() => setCollapsed((isCollapsed) => !isCollapsed)}
                color="info"
            >
                <span className={styles['filter-collapsed__header-title']}>
                    {title}
                </span>
                <svg className={styles['filter-collapsed__header-angle']} width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 1L7 7L1 1" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Button>
            <Collapse in={!isCollapsed} >
                <div className={styles['filter-collapsed__content']}>
                    {children}
                </div>
            </Collapse>
        </div>
    )
}

export default FilterCollapsed;