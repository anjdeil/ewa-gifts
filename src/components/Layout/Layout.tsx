import React, { FC, ReactNode } from "react";
import Header from "../Layouts/Header/Header";
import TopBar from "../Layouts/TopBar/TopBar";
import PopupContainer from "@/components/Popups/PopupContainer";
import { Footer } from "../Layouts";
import { useMediaQuery } from "@mui/material";
import MobileHeader from "../Layouts/MobileHeader/MobileHeader";
import BottomMenu from "../Layouts/BottomMenu";
import { CategoryBars } from "../Common/CategoryBars";

const Layout: FC = ({ children }: { children?: ReactNode }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <>
            {!isMobile && <TopBar />}
            {!isMobile ? <Header /> : <MobileHeader />}
            <PopupContainer />
            {isMobile && (<BottomMenu />)}
            <div style={{ padding: '20px 0' }}>

                <CategoryBars />
            </div>
            {children}
            <Footer />
        </>
    );
};

export default Layout;
