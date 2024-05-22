import React, { FC, useEffect } from "react";
import Header from "../Layouts/Header/Header";
import TopBar from "../Layouts/TopBar/TopBar";
import PopupContainer from "@/components/Popups/PopupContainer";
import { Footer } from "../Layouts";


const Layout: FC = ({ children }) => {
    return (
        <>
            <TopBar />
            <Header />
            <PopupContainer />
            {children}
            <Footer />
        </>
    );
};

export default Layout;
