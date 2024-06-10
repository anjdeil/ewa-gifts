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
            backgroundColor: variables.inputLight,
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '10px',
            borderColor: variables.inputLight,
        },
        "&:hover": {
            ".MuiInputBase-input": {
                backgroundColor: variables.inputDarker,
            },
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: variables.inputDarker
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