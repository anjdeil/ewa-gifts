import { styled } from "@mui/material";
import React from 'react';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import variables from "@/styles/variables.module.scss";

const CheckBoxIcon = styled('span')(() => ({
    borderRadius: 3,
    width: 24,
    height: 24,
    border: `1px solid ${variables.textGray}`,
    transition: '0.1s ease'
}));

const CheckBoxCheckedIcon = styled(CheckBoxIcon)({
    '&::before': {
        display: 'block',
        width: '100%',
        height: '100%',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='17' height='12' viewBox='0 0 17 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 5.5L6 10.5L15.5 1' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: 'center',
        content: '""',
    }
});

function EwaCheckbox(props: CheckboxProps) {
    return (
        <Checkbox
            color="default"
            checkedIcon={< CheckBoxCheckedIcon />}
            icon={< CheckBoxIcon />}
            {...props}
        />
    );
}

export default EwaCheckbox;