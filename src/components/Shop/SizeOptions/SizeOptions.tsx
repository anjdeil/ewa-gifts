import { SizeOptionsProps } from "@/types/Shop/SizeOptions";
import { Box, Button } from "@mui/material";
import { FC, useState } from "react";
import styles from './styles.module.scss';

export const SizeOptions: FC<SizeOptionsProps> = ({ sizeAttributes }) =>
{
    const [buttonId, setButtonId] = useState<string | null>(null);

    const onButtonClick = (id: string | null) =>
    {
        setButtonId(id);
    };
    return (
        <Box className={styles.SizeOptions}>
            {sizeAttributes.map((attr, index) =>
            {
                const uniqueId = `size-button-${index}`;

                return (
                    <Button
                        key={uniqueId}
                        className={`
                            ${styles.SizeOptions__button}
                            ${buttonId === uniqueId && styles.SizeOptions__button_active}
                            `}
                        onClick={() => onButtonClick(uniqueId)}
                    >
                        {attr.name}
                    </Button>
                )
            })}
        </Box>
    )
}