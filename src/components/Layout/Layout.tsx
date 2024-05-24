import React, { FC, useEffect } from "react";
import Header from "../Layouts/Header/Header";
import TopBar from "../Layouts/TopBar/TopBar";
import PopupContainer from "@/components/Popups/PopupContainer";
import { Footer } from "../Layouts";
import BottomMenu from "../Layouts/BottomMenu";
import { useMediaQuery } from '@mui/material';



const Layout: FC = ({ children }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <>
            <TopBar />
            <Header />
            <PopupContainer />
            {isMobile && (<BottomMenu />)}
            {children}
            <Footer />
        </>
    );
};

export default Layout;
