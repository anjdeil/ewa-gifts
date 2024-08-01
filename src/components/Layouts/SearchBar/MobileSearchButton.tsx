import { Button } from "@mui/material";
import variables from '@/styles/variables.module.scss';
import React from "react";
import { popupSet } from "@/store/reducers/PopupSlice";
import { useDispatch } from "react-redux";

const MobileSearchButton = () => {

    const dispatch = useDispatch();

    return (
        <Button
            sx={{
                backgroundColor: variables.inputLight,
                width: "100%",
                textTransform: "none",
                fontSize: "1rem",
                justifyContent: "flex-start",
                borderRadius: "10px",
                padding: "8px",
                color: variables.textGray,
                '&:hover': {
                    backgroundColor: variables.inputDarker,

                }
            }}
            onClick={() => dispatch(popupSet('mobile-search'))}
        >
            Szukaj
        </Button>
    )
}

export default MobileSearchButton;