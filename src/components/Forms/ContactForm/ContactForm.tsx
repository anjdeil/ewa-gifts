import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomInput } from "../CustomInput";
import { useSendAnEmailMutation } from "@/store/contactForm7/contactForm7Api";
import variables from "@/styles/variables.module.scss";
import { WpWooError } from "@/types/Services";
import styles from "./styles.module.scss";
import Link from "next/link";

const ContactFormSchema = z.object({
    companyName: z.string().min(1, "Wprowadź nazwę firmy"),
    nameAndSurname: z.string().min(1, "Wprowadź imię i nazwisko"),
    phone: z.string().min(9, "Wprowadź właściwy numer telefonu"),
    email: z.string().email('Wprowadź adres e-mail'),
    notice: z.string().min(1, "Wprowadź opis"),
    agreement: z.boolean().refine(value => value === true, {
        message: "Nie możemy wysłać wiadomości bez umowy o przetwarzaniu danych",
    })
});

type ContactForm = z.infer<typeof ContactFormSchema>;

export default function ContactForm()
{
    const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<ContactForm>({
        resolver: zodResolver(ContactFormSchema)
    });

    const [sendAnEmail, { isError, error }] = useSendAnEmailMutation();

    const submitForm = async ({
        companyName,
        nameAndSurname,
        phone,
        email,
        notice,
    }: ContactForm) =>
    {
        const formData = {
            _wpcf7_unit_tag: 'wpcf7-9cea8df-o1',
            'company-name': companyName,
            'customer-name': nameAndSurname,
            'phone': phone,
            'email': email,
            'notice': notice
        };

        const response = await sendAnEmail({ formId: 237618, formData });

        if (response && 'data' in response)
        {
            reset();
        }
    }

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <CustomInput
                fieldName="Nazwa firmy"
                name='companyName'
                register={register}
                errors={errors}
            />
            <CustomInput
                fieldName="Imię i nazwisko"
                name='nameAndSurname'
                register={register}
                errors={errors}
            />
            <CustomInput
                fieldName="Numer telefonu"
                name='phone'
                register={register}
                errors={errors}
            />
            <CustomInput
                fieldName="E-mail"
                name='email'
                register={register}
                errors={errors}
            />
            <CustomInput
                fieldName="Opis"
                name='notice'
                isTextarea={true}
                register={register}
                errors={errors}
            />
            <CustomInput
                fieldName="Wyrażam zgodę na przesyłanie informacji handlowej"
                name='agreement'
                isCheckbox={true}
                register={register}
                errors={errors}
            />

            {(isSubmitSuccessful && !isError) &&
                <p
                    className={styles["contact-form__message"]}
                    style={{ color: variables.successfully }}
                >
                    Twoja wiadomość została wysłana
                </p>
            }
            {isError &&
                <p
                    className={styles["contact-form__message"]}
                    style={{ color: variables.error }}
                    dangerouslySetInnerHTML={{ __html: (error as WpWooError).data?.message }}
                />
            }

            <button
                className={`${styles["contact-form__button"]} btn-primary btn`}
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Wysłanie...' : 'Wyślij'}
            </button>

            <p className={styles["contact-form__rules"]}>
                Sprawdź naszą <Link href={'/polityka-prywatnosci'}>Politykę Prywatności</Link> i dowiedz się, w jaki sposób przetwarzamy dane.
            </p>
        </form>
    );
}