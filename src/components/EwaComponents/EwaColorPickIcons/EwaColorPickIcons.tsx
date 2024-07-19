import variables from "@/styles/variables.module.scss";
import { styled } from "@mui/material";

export const EwaColorPickIcon = styled('span')(({ color = '#ffffff' }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: "50%",
    width: 26,
    height: 26,
    outline: `2px solid rgba(0,0,0,0.1)`,
    transition: '0.1s ease',
    background: color,
}));

export const EwaColorPickCheckedIcon = styled(EwaColorPickIcon)({
    '&::before': {
        display: 'block',
        content: '""',
        width: '10px',
        height: '10px',
        borderRadius: "50%",
        backgroundColor: variables.inputLight
    }
});