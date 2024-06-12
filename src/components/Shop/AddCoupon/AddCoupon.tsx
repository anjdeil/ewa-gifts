import { Box, CircularProgress } from "@mui/material";
import { CustomInput } from "@/components/Forms/CustomInput";
import { ChangeEvent, FC, useState } from "react";
import styles from './styles.module.scss';
import { useAddCoupon } from "@/hooks/useAddCoupon";
import { z } from "zod";

const AddCouponPropsSchema = z.object({
    orderId: z.number().nullable()
});

type AddCouponProps = z.infer<typeof AddCouponPropsSchema>;

export const AddCoupon: FC<AddCouponProps> = ({ orderId = null }) =>
{
    const { isLoading, error, addCoupon } = useAddCoupon();
    const [inputValue, setInputValue] = useState<string>("");

    const onButtonClick = () =>
    {
        if (orderId && inputValue.length > 0)
        {
            addCoupon(orderId, inputValue);
            setInputValue('');
        }
    }

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    {
        setInputValue(event.target.value);
    }

    return (
        <>
            <Box className={styles.AddCoupon}>
                <Box className={styles.AddCoupon__content}>
                    <CustomInput
                        isRequire={false}
                        placeholder={"Code coupon"}
                        className={styles.AddCoupon__input}
                        onChange={onInputChange}
                        value={inputValue}
                    />
                    {isLoading ?
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                        :
                        <button
                            className={`link btn btn-primary ${styles.AddCoupon__button}`}
                            onClick={() => onButtonClick()}
                        >
                            Wykorzystaj kupon
                        </button>
                    }
                </Box>
                {error && <p className={styles.AddCoupon__error}>{error}</p>}
            </Box>

        </>
    )
}