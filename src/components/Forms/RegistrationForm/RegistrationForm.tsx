import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomInput } from "../CustomInput";
import { Box } from "@mui/material";
import { useFetchUserRegistrationMutation } from "@/store/wooCommerce/wooCommerceApi";
import { useFetchUserTokenMutation } from "@/store/jwt/jwtApi";
import { useCookies } from 'react-cookie';
import React from 'react';
import variables from '@/styles/variables.module.scss';
import { RegistrationFormSchema, WpWooError } from "@/types";
import { z } from "zod";
import styles from './styles.module.scss';

interface RegistrationFormProps
{
    isCheckout?: boolean,
}

export interface FormHandle
{
    submit: () => void;
}

const RegistrationForm = forwardRef<FormHandle, RegistrationFormProps>(({ isCheckout = false }, ref) =>
{
    useImperativeHandle(ref, () => ({
        submit: () => handleSubmit(onSubmit)()
    }));

    const [isShipping, setShipping] = useState<boolean>(false);
    const formSchema = RegistrationFormSchema(isCheckout, isShipping);
    type RegistrationFormType = z.infer<typeof formSchema>;

    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, setValue, reset } = useForm<RegistrationFormType>({
        resolver: zodResolver(formSchema)
    });

    function onShippingChange()
    {
        setShipping(prev => !prev);
    }

    const [fetchUserRegistration, { isError, error }] = useFetchUserRegistrationMutation();
    const [fetchUserToken] = useFetchUserTokenMutation();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setCookie] = useCookies(['userToken']);

    const onSubmit = async (data: RegistrationFormType) =>
    {
        const body = {
            email: data.email,
            first_name: data.name,
            last_name: data.lastName,
            username: data.email,
            password: data.password,
            billing: {
                company: data.companyName,
                address_1: data.address,
                address_2: data.nip,
                city: data.city,
                postcode: data.postCode,
                phone: data.phoneNumber,
            },
            shipping: {
                first_name: '',
                last_name: '',
                company: '',
                address_1: '',
                city: '',
                postcode: '',
                country: 'Poland'
            }
        }

        try
        {
            const response = await fetchUserRegistration(body);
            if (response && 'data' in response)
            {
                const userToken = await fetchUserToken({ username: data.email, password: data.password }).unwrap();
                setCookie('userToken', userToken.token,
                    {
                        path: '/',
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8)
                    });
            }
        } catch (error)
        {
            return { error: (error as Error).message };
        } finally
        {
            reset();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box className={styles.form__wrapper}>
                <Box className={styles.form__column}>
                    <CustomInput
                        fieldName="Imię"
                        name='name'
                        register={register}
                        errors={errors}
                        setValue={setValue}
                    />
                    <CustomInput
                        fieldName="Nazwisko"
                        name='lastName'
                        register={register}
                        errors={errors}
                        setValue={setValue}
                    />
                    <CustomInput fieldName="Adres e-mail" name='email' register={register} errors={errors} />
                    <CustomInput
                        fieldName="Hasło"
                        name='password'
                        register={register}
                        errors={errors}
                        isPassword={true}
                    />
                    <CustomInput
                        fieldName="Powtórz hasło"
                        name='confirmPassword'
                        register={register}
                        errors={errors}
                        isPassword={true}
                    />
                    <CustomInput
                        fieldName="Numer telefonu"
                        name='phoneNumber'
                        register={register}
                        errors={errors}
                        isNumeric={true}
                    />
                </Box>
                <Box className={styles.form__column}>
                    <CustomInput
                        fieldName="NIP (optional)"
                        name='nip'
                        register={register}
                        errors={errors}
                        isNumeric={true}
                    />
                    <CustomInput fieldName="Miasto" name='city' register={register} errors={errors} />
                    <CustomInput fieldName="Kraj / region" name='country' register={register} errors={errors} />
                    <CustomInput fieldName="Nazwa firmy" name='companyName' register={register} errors={errors} />
                    <CustomInput fieldName="Ulica" name='address' register={register} errors={errors} />
                    <CustomInput
                        fieldName="Kod pocztowy"
                        name='postCode'
                        register={register}
                        errors={errors}
                        isNumeric={true}
                    />
                    <CustomInput
                        fieldName="Twoje dane osobowe będą wykorzystywane do wspierania korzystania z tej witryny, zarządzania dostępem до konta oraz do других celów opisanych в naszej polityka prywatności"
                        name='terms'
                        register={register}
                        errors={errors}
                        isCheckbox={true}
                    />
                    <button className="btn-primary btn" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                    {(isSubmitSuccessful && !isError) && <p style={{ color: variables.successfully }}>
                        The account was created successfully
                    </p>}
                    {isError && <p style={{ color: variables.error }}
                        dangerouslySetInnerHTML={{ __html: (error as WpWooError).data?.message }} />}
                </Box>
            </Box>
            {isCheckout && <Box className={styles.form__content}>
                <CustomInput
                    fieldName="Wysłać na inny adres?"
                    errors={errors}
                    isCheckbox={true}
                    onChange={onShippingChange}
                />
                {isShipping &&
                    <Box className={styles.form__wrapper}>
                        <Box className={styles.form__column}>
                            <CustomInput fieldName="Imię" name='nameShipping' register={register} errors={errors} />
                            <CustomInput fieldName="Nazwisko" name='lastNameShipping' register={register} errors={errors} />
                            <CustomInput fieldName="Adres e-mail" name='emailShipping' register={register} errors={errors} />
                            <CustomInput fieldName="Nazwa firmy" name='companyNameShipping' register={register} errors={errors} />
                        </Box>
                        <Box className={styles.form__column}>
                            <CustomInput fieldName="Miasto" name='cityShipping' register={register} errors={errors} />
                            <CustomInput fieldName="Kraj / region" name='countryShipping' register={register} errors={errors} />
                            <CustomInput fieldName="Ulica" name='addressShipping' register={register} errors={errors} />
                            <CustomInput
                                fieldName="Kod pocztowy"
                                name='postCodeShipping'
                                register={register}
                                errors={errors}
                                isNumeric={true}
                            />
                        </Box>
                    </Box>}
                <CustomInput
                    fieldName="Uwagi do zamówienia (opcjonalne)"
                    name='textarea'
                    register={register}
                    errors={errors}
                    isTextarea={true}
                    placeholder="Wprowadź opis..."
                />
            </Box>}
        </form>
    )
});

RegistrationForm.displayName = 'RegistrationForm';

export default RegistrationForm;