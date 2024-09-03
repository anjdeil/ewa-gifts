import { SizeOptionsProps } from "@/types/Shop/SizeOptions";
import { Box, Button } from "@mui/material";
import { FC } from "react";
import styles from './styles.module.scss';

export const SizeOptions: FC<SizeOptionsProps> = ({ sizeAttributes, onSizeChange, currentSize, availableSizes }) =>
{
    return (
        <Box className={styles.SizeOptions}>
            {sizeAttributes.map(attr =>
            {
                const uniqId = "slug" in attr ? attr.slug : attr.option;
                let isAvailable = true;

                if (availableSizes)
                    isAvailable = availableSizes.some(size => "option" in size && size.option === uniqId);

                return (
                    <Button
                        key={uniqId}
                        className={`
                            ${styles.SizeOptions__button}
                            ${currentSize === uniqId && styles.SizeOptions__button_active}
                            ${!isAvailable && styles.SizeOptions__button_active}
                            `}
                        onClick={() => onSizeChange(uniqId)}
                        disabled={!isAvailable}
                    >
                        {attr.name}
                    </Button>
                )
            })}
        </Box>
    )
}