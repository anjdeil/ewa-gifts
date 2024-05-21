import { FC } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

const SubscriptionFormSchema = z.object({
    email: z.string().min(10, 'Error'),
})

export const SubscriptionForm: FC = () =>
{
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(SubscriptionFormSchema)
    })

    return (
        <form onSubmit={handleSubmit(({ email }) =>
        {
            console.log(email);
        })}>
            <input
                placeholder="Test Email"
                {...register("email")} />
            <button type="submit">Submit test</button>
        </form>
    )
}  