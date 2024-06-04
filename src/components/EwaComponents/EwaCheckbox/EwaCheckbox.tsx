import { styled } from "@mui/material";
import * as React from 'react';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import variables from "@/styles/variables.module.scss";

const CheckBoxIcon = styled('span')(() => ({
    borderRadius: 3,
    width: 24,
    height: 24,
    border: `1px solid ${variables.textGray}`,
    transition: '0.1s ease',
    'input:hover ~ &': {
        backgroundColor: variables.inputLight,
    },
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

// Inspired by blueprintjs
function BpCheckbox(props: CheckboxProps) {
    return (
        <Checkbox
            sx={{
                '&:hover': { bgcolor: 'transparent' },
            }
            }
            disableRipple
            color="default"
            checkedIcon={< CheckBoxCheckedIcon />}
            icon={< CheckBoxIcon />}
            inputProps={{ 'aria-label': 'Checkbox demo' }}
            {...props}
        />
    );
}

export default BpCheckbox;