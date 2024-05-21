import { FC } from "react";
import Header from "../Layouts/Header/Header";
import TopBar from "../Layouts/TopBar/TopBar";
import { Footer } from "../Layouts";

const Layout: FC = ({ children }) =>
{
    return (
        <>
            <TopBar />
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default Layout;
