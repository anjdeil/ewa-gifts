import { AdaptiveImageProps } from "@/types";
import { Box } from "@mui/material";
import Image from "next/image";
export const AdaptiveImage: React.FC<AdaptiveImageProps> = ({ isMobile, imageUrl, mobileImageUrl, alt, descOffset, mobOffset }) =>
{
    const src = isMobile ? mobileImageUrl : imageUrl;
    const paddingTop = isMobile ? mobOffset : descOffset;
    return (
        <Box position={'relative'} paddingTop={paddingTop} >
            <Image src={src} alt={alt} layout="fill" objectFit="cover" />
        </Box>
    );
};