import { Swiper } from 'swiper/react';
import { styled } from "@mui/material";
import variables from "@/styles/variables.module.scss";

const CustomSwiper = styled(Swiper)`
.swiper-pagination {
    margin-top: 20px;
    position: relative;
    &-bullet {
        border-radius: 10px;
        width: 34px;
        height: 5px;
        background-color: ${variables.techBg};
    }
}
`;

export default CustomSwiper;