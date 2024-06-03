import { Pagination } from "@mui/material";
import { styled } from "@mui/material";
import variables from "@/styles/variables.module.scss";

const PagesNavigation = styled(Pagination)(() => ({
    ".MuiPaginationItem-root": {
        fontWeight: 500,
        borderRadius: '10px',
        "&.Mui-selected": {
            backgroundColor: variables.inputLight,
        }
    }
}));

export default PagesNavigation;