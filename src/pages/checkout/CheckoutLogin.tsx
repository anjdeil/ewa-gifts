import { Box, Button } from "@mui/material"
import styles from './styles.module.scss';
import { LoginForm } from "@/components/Forms/LoginForm";
import { z } from "zod";
import { FC } from "react";

const CheckoutLoginPropsSchema = z.object({
    onContinueClick: z.function().args(z.void()).returns(z.void()),
})

type CheckoutLoginType = z.infer<typeof CheckoutLoginPropsSchema>;

export const CheckoutLogin: FC<CheckoutLoginType> = ({ onContinueClick }) =>
{
    return (
        <Box className={styles.checkoutLogin}>
            <Box className={styles.checkoutLogin__form}>
                <LoginForm />
                <Button onClick={() => onContinueClick()}>
                    Continue
                </Button>
            </Box>
        </Box>
    )
}