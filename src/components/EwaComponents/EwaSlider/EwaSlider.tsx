import variables from "@/styles/variables.module.scss";
import { styled, Slider } from "@mui/material";

const EwaSlider = styled(Slider)({
    color: variables.accent,
    ".MuiSlider-rail": {
        opacity: 1,
        backgroundColor: variables.inputLight,
    },
    ".MuiSlider-track": {
        backgroundColor: variables.accentLight,
        borderColor: variables.accentLight,
    },
    ".MuiSlider-thumb": {
        "&:hover, &.Mui-focusVisible": {
            boxShadow: `0px 0px 0px 8px rgba(254, 203, 0, 0.2)`
        },
        "&.Mui-active": {
            boxShadow: `0px 0px 0px 14px rgba(254, 203, 0, 0.2)`
        },
        "&::before": {
            boxShadow: "none"
        }
    }
});

export default EwaSlider;