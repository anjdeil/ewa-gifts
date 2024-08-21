import EwaCheckbox from "@/components/EwaComponents/EwaCheckbox/EwaCheckbox";
import { AttributeTermType } from "@/types/Services/customApi/Attribute/AttributeTermType";
import { Box, FormControlLabel } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import styles from "../styles.module.scss";

interface SuppliersFilterPropsType {
    suppliers: AttributeTermType[],
    onChangeSupplier: (suppliers: string[]) => void,
    currentSuppliers: string[],
    onReset: () => void
}

const SuppliersFilter: FC<SuppliersFilterPropsType> = ({ suppliers, onChangeSupplier, currentSuppliers, onReset }) => {

    const [checkedSuppliers, setCheckedSuppliers] = useState<boolean[]>(
        suppliers.reduce<boolean[]>((prev, { slug }) => {
            prev.push(currentSuppliers.includes(slug))
            return prev;
        }, [])
    );

    useEffect(() => {
        setCheckedSuppliers(suppliers.reduce<boolean[]>((prev, { slug }) => {
            prev.push(currentSuppliers.includes(slug))
            return prev;
        }, []));
    }, [currentSuppliers]);

    const handleChange = (position: number) => {
        const updatedCheckedSuppliers = checkedSuppliers.map((value, index) => index === position ? !value : value);
        setCheckedSuppliers(updatedCheckedSuppliers);

        const choosenSuppliers = suppliers.reduce<string[]>((prev, { slug }, index) => {
            if (updatedCheckedSuppliers[index]) prev.push(slug);
            return prev;
        }, []);

        onChangeSupplier(choosenSuppliers);
    }

    return (
        <div className={styles['sidebar-filter']}>
            <div className={styles['sidebar-filter__content']}>
                {suppliers?.map((supplier, index) => (
                    <Box key={supplier.name}>
                        <FormControlLabel
                            sx={{
                                '.MuiTypography-root': {
                                    fontSize: '0.9em',
                                }
                            }}
                            label={supplier.name}
                            value={supplier.id}
                            control={
                                <EwaCheckbox
                                    checked={checkedSuppliers[index]}
                                    onChange={() => handleChange(index)}
                                    inputProps={{
                                        "aria-label": supplier.name,
                                    }}
                                />
                            }
                        />
                    </Box>
                ))}
            </div>
            <div className={styles['sidebar-filter__bottom']}>
                {Boolean(currentSuppliers.length) &&
                    <button className={styles['sidebar-filter__button']} onClick={() => onReset()}>
                        <svg className={styles['sidebar-filter__button-icon']} aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.38739 2.11261C9.27801 1.22199 10.722 1.22199 11.6126 2.1126L14.8503 5.35026C15.7409 6.24088 15.7409 7.68486 14.8503 8.57547L10.4337 12.9921L14.5163 12.992C14.8312 12.9921 15.0864 13.2473 15.0864 13.5622C15.0864 13.8771 14.8312 14.1323 14.5163 14.1323L4.10916 14.1323C3.50431 14.1323 2.92424 13.8921 2.49655 13.4644L1.37869 12.3465C0.488077 11.4559 0.488078 10.0119 1.3787 9.1213L8.38739 2.11261ZM8.82108 12.9921L11.0792 10.7339L6.22896 5.88365L2.185 9.92761C1.73969 10.3729 1.73969 11.0949 2.185 11.5402L3.30285 12.6581C3.5167 12.8719 3.80674 12.992 4.10916 12.9921H8.82108ZM7.03526 5.07735L11.8855 9.92761L14.044 7.76917C14.4893 7.32386 14.4893 6.60187 14.044 6.15657L10.8063 2.91891C10.361 2.4736 9.63901 2.4736 9.1937 2.91891L7.03526 5.07735Z" fill="black" />
                        </svg>
                        Resetuj
                    </button>
                }
            </div>
        </div>
    )
}

export default SuppliersFilter;