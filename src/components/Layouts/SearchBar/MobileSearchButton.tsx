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
                backgroundColor: variables.backgroundWhite,
                width: "100%",
                textTransform: "none",
                fontSize: "1rem",
                justifyContent: "flex-start",
                color: variables.textGrey,
                borderRadius: "10px",
                padding: "8px",
                '&:hover': {
                    backgroundColor: variables.inputLight,

                }
            }}
            onClick={() => dispatch(popupSet('mobile-search'))}
        >
            Search
        </Button>
    )
}

export default MobileSearchButton;