import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
// import { CustomInput } from "../CustomInput";
// import { Box } from "@mui/material";
import { useFetchUserRegistrationMutation } from "@/store/wooCommerce/wooCommerceApi";
import { useFetchUserTokenMutation } from "@/store/jwt/jwtApi";
import { useCookies } from 'react-cookie';
import React from 'react';
// import variables from '@/styles/variables.module.scss';
import { CartItem, RegistrationFormSchema } from "@/types";
import { z } from "zod";
// import styles from './styles.module.scss';
import { registrationUserDataType, userFieldsType } from "@/types/Pages/checkout";
import { useCreateOrderWoo } from "@/hooks/useCreateOrderWoo";
import { ShippingLine } from "@/store/reducers/CartSlice";
import { useRouter } from "next/router";

interface RegistrationFormProps
{
    isCheckout?: boolean,
    userFields?: userFieldsType | null,
    lineItems?: CartItem[] | [],
    shippingLines?: ShippingLine[]
}

export interface FormHandle
{
    submit: () => void;
}

export const RegistrationForm = forwardRef<FormHandle, RegistrationFormProps>(({ isCheckout = false, userFields, lineItems, shippingLines }, ref) =>
{
    useImperativeHandle(ref, () => ({
        submit: () => handleSubmit(onSubmit)()
    }));

    const router = useRouter();
    const [cookie, setCookie] = useCookies(['userToken']);
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [isShipping, setShipping] = useState<boolean>(false);
    const formSchema = RegistrationFormSchema(isLoggedIn, isCheckout, isShipping);
    type RegistrationFormType = z.infer<typeof formSchema>;

    const { handleSubmit } = useForm<RegistrationFormType>({
        resolver: zodResolver(formSchema)
    });

    // function onShippingChange() { setShipping(prev => !prev); }

    const [fetchUserRegistration] = useFetchUserRegistrationMutation();
    const [fetchUserToken] = useFetchUserTokenMutation();
    const { createOrder, error: createError, createdOrder } = useCreateOrderWoo();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars


    useEffect(() =>
    {
        setShipping(false);
        if (createError)
        {
            alert("Server Error, please try again")
        } else if (createdOrder)
        {
            router.push(`/my-account/orders/${createdOrder.id}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createError, createdOrder])

    useEffect(() =>
    {
        if ("userToken" in cookie)
        {
            setLoggedIn(true);
        } else
        {
            setLoggedIn(false);
        }
    }, [cookie])

    const onSubmit = async (data: RegistrationFormType) =>
    {
        const body: registrationUserDataType = {
            id: userFields && userFields.id || '',
            email: data.email,
            first_name: data.name,
            last_name: data.lastName,
            username: data.name,
            password: data.password,
            billing: {
                first_name: data.name,
                last_name: data.lastName,
                company: data.companyName,
                address_1: data.address,
                address_2: data.nip,
                city: data.city,
                postcode: data.postCode,
                country: data.country,
                email: data.email,
                phone: data.phoneNumber,
            },
            shipping: {
                first_name: isShipping && data.nameShipping || '',
                last_name: isShipping && data.lastNameShipping || '',
                company: isShipping && data.companyNameShipping || '',
                address_1: isShipping && data.addressShipping || '',
                city: isShipping && data.cityShipping || '',
                postcode: isShipping && data.postCodeShipping || '',
                country: isShipping && data.countryShipping || '',
                email: data.email,
                phone: isShipping && data.phoneNumberShipping || '',
            }
        }

        try
        {
            if (body && isCheckout && lineItems)
            {
                if (isLoggedIn)
                {
                    createOrder(lineItems, 'processing', shippingLines, body);
                    return;
                } else
                {
                    const response = await fetchUserRegistration(body);
                    if (!response) return;
                    createOrder(lineItems, 'processing', shippingLines, body);
                    const userToken = await fetchUserToken({ username: data.email, password: data.password }).unwrap();
                    setCookie('userToken', userToken.token, {
                        path: '/',
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8)
                    });
                }
            } else
            {
                const response = await fetchUserRegistration(body);
                if (response && 'data' in response)
                {
                    const userToken = await fetchUserToken({ username: data.email, password: data.password }).unwrap();
                    setCookie('userToken', userToken.token, {
                        path: '/',
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8)
                    });
                }
            }
        } catch (error)
        {
            return { error: (error as Error).message };
        } finally
        {
            // reset();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* <Box className={styles.form__wrapper}>
                <CustomInput
                    fieldName="Imię"
                    name='name'
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    initialValue={userFields ? userFields.first_name : null}
                />
                <CustomInput
                    fieldName="Nazwisko"
                    name='lastName'
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    initialValue={userFields ? userFields.last_name : null}
                />
                <CustomInput
                    fieldName="Adres e-mail"
                    name='email'
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    initialValue={userFields ? userFields.email : null}
                />
                {!isLoggedIn && <CustomInput
                    fieldName="Hasło"
                    name='password'
                    register={register}
                    errors={errors}
                    isPassword={true}
                />}
                {!isLoggedIn && <CustomInput
                    fieldName="Powtórz hasło"
                    name='confirmPassword'
                    register={register}
                    errors={errors}
                    isPassword={true}
                />}
                <CustomInput
                    fieldName="Numer telefonu"
                    name='phoneNumber'
                    register={register}
                    errors={errors}
                    isNumeric={true}
                    setValue={setValue}
                    initialValue={userFields ? userFields.billing.phone : null}
                />
                <CustomInput
                    fieldName="NIP (optional)"
                    name='nip'
                    register={register}
                    errors={errors}
                    isNumeric={true}
                    setValue={setValue}
                    initialValue={userFields ? userFields.billing.address_2 : null}
                />
                <CustomInput
                    fieldName="Nazwa firmy"
                    name='companyName'
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    initialValue={userFields ? userFields.billing.company : null}
                />
                <CustomInput
                    fieldName="Kraj / region"
                    name='country'
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    initialValue={userFields ? userFields.billing.country : null}
                />
                <CustomInput
                    fieldName="Miasto"
                    name='city'
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    initialValue={userFields ? userFields.billing.city : null}
                />
                <CustomInput
                    fieldName="Ulica"
                    name='address'
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    initialValue={userFields ? userFields.billing.address_1 : null}
                />
                <CustomInput
                    fieldName="Kod pocztowy"
                    name='postCode'
                    register={register}
                    errors={errors}
                    isNumeric={true}
                    isPost={true}
                    setValue={setValue}
                    initialValue={userFields ? userFields.billing.postcode : null}
                />
                {!isCheckout && <Box className={styles.form__bottom}>
                    <CustomInput
                        fieldName="Wyrażam zgodę na przetwarzanie danych osobowych."
                        name='terms'
                        register={register}
                        errors={errors}
                        isCheckbox={true}
                    />
                    <button className="btn-primary btn" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                    {(isSubmitSuccessful && !isError) && <p style={{ color: variables.successfully }}>
                        The account was created successfully
                    </p>}
                </Box>}
                {isError && <p style={{ color: variables.error }}
                    dangerouslySetInnerHTML={{ __html: (error as WpWooError).data?.message }} />}
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
                        <CustomInput fieldName="Imię" name='nameShipping' register={register} errors={errors} />
                        <CustomInput fieldName="Nazwisko" name='lastNameShipping' register={register} errors={errors} />
                        <CustomInput fieldName="Nazwa firmy" name='companyNameShipping' register={register} errors={errors} />
                        <CustomInput
                            fieldName="Numer telefonu"
                            name='phoneNumberShipping'
                            register={register}
                            errors={errors}
                            isNumeric={true}
                        />
                        <CustomInput fieldName="Kraj / region" name='countryShipping' register={register} errors={errors} />
                        <CustomInput fieldName="Miasto" name='cityShipping' register={register} errors={errors} />
                        <CustomInput fieldName="Ulica" name='addressShipping' register={register} errors={errors} />
                        <CustomInput
                            fieldName="Kod pocztowy"
                            name='postCodeShipping'
                            register={register}
                            errors={errors}
                            isNumeric={true}
                            isPost={true}
                        />
                    </Box>}
                <CustomInput
                    fieldName="Uwagi do zamówienia (opcjonalne)"
                    name='textarea'
                    register={register}
                    errors={errors}
                    isTextarea={true}
                    placeholder="Wprowadź opis..."
                />
            </Box>} */}
        </form>
    )
});

RegistrationForm.displayName = 'RegistrationForm';
