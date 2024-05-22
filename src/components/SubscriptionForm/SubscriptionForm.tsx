import { FC } from "react"; import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query';
import { useForm } from "react-hook-form";

// _wpcf7_unit_tag: 'wpcf7-c68d4a7-o1',
// 'your-email': 'asd@mail.com'

// const SubscriptionFormSchema = z.object({
//     email: 
// })

export const emailFormReslover = async (values) =>
{
    return {
        values: values.email ? values : {},
        errors: !values.email

            ? {
                email: {
                    type: 'required',
                    message: 'Email is required'
                }
            }
            : {}
    }
}

export const SubscriptionForm: FC = () =>
{
    const { register, handleSubmit, formState: { errors, isLoading } } = useForm();



    return (
        <form onSubmit={() =>
        {
            handleSubmit
        }}>
            <input placeholder="Test Email" {...register('email')} />
            <button>Submit test</button>
        </form>
    )
}  