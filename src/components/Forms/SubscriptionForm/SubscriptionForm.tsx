import { FC } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './styles.module.scss';
import Link from "next/link";
import Image from 'next/image';
import { useSendAnEmailMutation } from "@/store/contactForm7/contactForm7Api";

const SubscriptionFormSchema = z.object({
    email: z.string().email('Please, type valid email'),
    consent: z.boolean().refine(value => value === true, {
        message: "You must agree to the terms",
    }),
})

export const SubscriptionForm: FC = () =>
{

    const [sendAnEmail, { data }] = useSendAnEmailMutation();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(SubscriptionFormSchema)
    })

    return (
        <div className={styles.form}>
            <Link href={'/'} passHref className={styles.form__logo}>
                <Image src="/logo.svg" alt="Logo" width={150} height={40} />
            </Link>
            <h3 className={styles.form__title}>
                Zapisz się do naszego newslettera
            </h3>
            <form onSubmit={handleSubmit(async ({ email }) =>
            {
                const formData = {
                    _wpcf7_unit_tag: 'wpcf7-c68d4a7-o1',
                    'your-email': email
                };
                const id = 22199;
                const response = await sendAnEmail({ id, formData });
                console.log(response);
            })}>
                <input
                    placeholder="Test Email"
                    {...register("email")}
                    className={styles.form__input}
                />
                {errors.email && <p className={styles.form__error}>{errors.email.message}</p>}
                <label className={styles.form__checkbox}>
                    <input
                        type="checkbox"
                        {...register("consent")}
                    />
                    Wyrażam zgodę na przesyłanie informacji handlowych.
                </label>
                {errors.consent && <p className={styles.form__error}>{errors.consent.message}</p>}
                <button className={`btn btn-primary ${styles.form__btn}`} type="submit">Call</button>
            </form>
            <p className={styles.form__rules}>
                Sprawdź naszą Politykę Prywatności i dowiedz się, w jaki sposób przetwarzamy dane. W każdej chwili możesz przerwać subskrybcję newslettera za darmo.
            </p>
        </div>

    )
}  
