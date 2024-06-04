import { styled, TextField } from "@mui/material";
import variables from "@/styles/variables.module.scss";

const EwaInput = styled(TextField)(() => ({
    ".MuiOutlinedInput-root": {
        ".MuiInputBase-input": {
            color: variables.blackColor,
            borderRadius: '10px',
            padding: "0.6em",
            fontSize: ".9em",
            textAlign: 'center',
            backgroundColor: variables.whiteLilac,
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '10px',
            borderColor: variables.whiteLilac,
        },
        "&:hover": {
            ".MuiInputBase-input": {
                backgroundColor: variables.inputLight,
            },
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: variables.inputLight
            },
        },
        "&.Mui-focused": {
            ".MuiInputBase-input": {
                backgroundColor: variables.backgroundWhite,
            },
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: variables.accent,
            },
        }
    }
}));

export default EwaInput;