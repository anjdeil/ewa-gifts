import { AdaptiveImageProps } from "@/types";
import { Box } from "@mui/material";
import Image from "next/image";
export const AdaptiveImage: React.FC<AdaptiveImageProps> = ({ isMobile, imageUrl, mobileImageUrl, alt, descOffset, mobOffset }) =>
{
    const src = isMobile && mobileImageUrl ? mobileImageUrl : imageUrl;
    const paddingTop = isMobile ? mobOffset : descOffset;
    return (
        <Box position={'relative'} paddingTop={paddingTop} borderRadius={'10px'} overflow={'hidden'} >
            <Image
                src={src}
                alt={alt}
                style={{
                    objectFit: 'contain',
                }}
                sizes={'100% 100%'}
                fill />
        </Box >
    );
};