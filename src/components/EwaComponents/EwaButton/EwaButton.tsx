import variables from "@/styles/variables.module.scss";
import { styled, Button } from "@mui/material";

export const EwaButton = styled(Button)({
    textTransform: 'none',
    color: variables.blackColor,
    backgroundColor: variables.accent,
    borderRadius: '10px',
    padding: '0.7em 1.5em',
    "&:hover": {
        backgroundColor: variables.accentLight,
    }
});

export const EwaButtonSecondary = styled(EwaButton)({
    backgroundColor: variables.accentLight,
    "&:hover": {
        backgroundColor: variables.accent,
    }
});

export const EwaButtonOutlined = styled(EwaButton)({
    backgroundColor: 'transparent',
    outline: `1px solid ${variables.blackColor}`,
    transition: '.2s ease',
    "&:hover": {
        outline: `1px solid ${variables.accentLight}`,
        backgroundColor: variables.accentLight,
    }
});
