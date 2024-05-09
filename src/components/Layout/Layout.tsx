import { FC } from "react";
import Header from "../Header/Header";
import TopBar from "../TopBar/TopBar";
import { useFetchMenuItemsQuery } from "@/store/actionCreators/wpAPI";
import { wpNavLinks } from "@/modules";

const Layout: FC = ({ children }) =>
{
    const { isError, error, isLoading, data } = useFetchMenuItemsQuery({ menus: "358" });

    const navLinks: wpNavLinks = {
        data,
        error,
        isError,
        isLoading,
    }

    return (
        <>
            <TopBar navLinks={navLinks} />
            <Header />
            {children}
        </>
    );
};

export default Layout;
