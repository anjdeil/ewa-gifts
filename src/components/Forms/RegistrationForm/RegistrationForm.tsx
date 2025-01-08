import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomInput } from "../CustomInput";
import { Box } from "@mui/material";
import { useFetchUserRegistrationMutation } from "@/store/wooCommerce/wooCommerceApi";
import { useFetchUserTokenMutation } from "@/store/jwt/jwtApi";
import { useCookies } from 'react-cookie';
import React from 'react';
import variables from '@/styles/variables.module.scss';
import { RegistrationFormSchema } from "@/types/Forms/RegistrationForm/index";
import { z } from "zod";
import styles from './styles.module.scss';
import { registrationUserDataType, userFieldsType } from "@/types/Pages/checkout";
import { useCreateOrderWoo } from "@/hooks/useCreateOrderWoo";
import { ShippingLine } from "@/store/reducers/CartSlice";
import { useRouter } from "next/router";
import { CartItem } from "@/types/Cart";
import { WpWooError } from "@/types/Services";
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface RegistrationFormProps {
  isCheckout?: boolean;
  userFields?: userFieldsType | null;
  lineItems?: CartItem[] | [];
  shippingLines?: ShippingLine[];
}

export interface FormHandle {
  submit: () => void;
}

export const RegistrationForm = forwardRef<FormHandle, RegistrationFormProps>(
  ({ isCheckout = false, userFields, lineItems, shippingLines }, ref) => {
    useImperativeHandle(ref, () => ({
      submit: () => handleSubmit(onSubmit)(),
    }));

    const router = useRouter();
    const [cookie, setCookie] = useCookies(['userToken']);
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [isShipping, setShipping] = useState<boolean>(false);
    const formSchema = RegistrationFormSchema(
      isLoggedIn,
      isCheckout,
      isShipping
    );
    type RegistrationFormType = z.infer<typeof formSchema>;

    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting, isSubmitSuccessful },
      setValue,
    } = useForm<RegistrationFormType>({
      resolver: zodResolver(formSchema),
    });

    function onShippingChange() {
      setShipping((prev) => !prev);
    }

    const [fetchUserRegistration, { isError, error }] =
      useFetchUserRegistrationMutation();
    const [fetchUserToken] = useFetchUserTokenMutation();
    const {
      createOrder,
      error: createError,
      createdOrder,
    } = useCreateOrderWoo();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    useEffect(() => {
      if (createError) {
        alert('Server Error, please try again');
      } else if (createdOrder) {
        router.push(`/my-account/orders/${createdOrder.id}`);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createError, createdOrder]);

    useEffect(() => {
      if ('userToken' in cookie) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    }, [cookie]);

    useEffect(() => {
      const inputs = document.querySelectorAll<HTMLInputElement>('input');
      inputs.forEach((input) => {
        if (input.value) {
          setValue(input.name as keyof RegistrationFormType, input.value, {
            shouldValidate: true,
          });
        }
      });
    }, [setValue]);

    const onSubmit = async (data: RegistrationFormType) => {
      const body: registrationUserDataType = {
        id: (userFields && userFields.id) || '',
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
          first_name: (isShipping && data.nameShipping) || '',
          last_name: (isShipping && data.lastNameShipping) || '',
          company: (isShipping && data.companyNameShipping) || '',
          address_1: (isShipping && data.addressShipping) || '',
          city: (isShipping && data.cityShipping) || '',
          postcode: (isShipping && data.postCodeShipping) || '',
          country: (isShipping && data.countryShipping) || '',
          email: data.email,
          phone: (isShipping && data.phoneNumberShipping) || '',
        },
      };

      try {
        if (body && isCheckout && lineItems) {
          if (isLoggedIn) {
            createOrder(lineItems, 'processing', shippingLines, body);
            return;
          } else {
            const response = await fetchUserRegistration(body);
            if (!response) return;
            createOrder(lineItems, 'processing', shippingLines, body);
            const userToken = await fetchUserToken({
              username: data.email,
              password: data.password,
            }).unwrap();
            setCookie('userToken', userToken.token, {
              path: '/',
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8),
            });
            await router.push('/my-account');
          }
        } else {
          const response = await fetchUserRegistration(body);
          if (response && 'data' in response) {
            const userToken = await fetchUserToken({
              username: data.email,
              password: data.password,
            }).unwrap();
            setCookie('userToken', userToken.token, {
              path: '/',
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8),
            });
            await router.push('/my-account');
          } else if (response && 'error' in response) {
            const errorResponse = response.error as FetchBaseQueryError;
            console.error('Registration error response:', errorResponse);
          }
        }
      } catch (error) {
        return { error: (error as Error).message };
      }
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.form__wrapper}>
          <CustomInput
            fieldName='Imię'
            name='name'
            register={register}
            errors={errors}
            setValue={setValue}
            initialValue={userFields ? userFields.first_name : null}
            autoComplete='given-name'
          />
          <CustomInput
            fieldName='Nazwisko'
            name='lastName'
            register={register}
            errors={errors}
            setValue={setValue}
            initialValue={userFields ? userFields.last_name : null}
            autoComplete='family-name'
          />
          <CustomInput
            fieldName='Adres e-mail'
            name='email'
            register={register}
            errors={errors}
            setValue={setValue}
            initialValue={userFields ? userFields.email : null}
            autoComplete='email'
          />
          <CustomInput
            fieldName='Numer telefonu'
            name='phoneNumber'
            register={register}
            errors={errors}
            isNumeric={true}
            setValue={setValue}
            initialValue={userFields ? userFields.billing.phone : null}
            autoComplete='tel'
          />
          <CustomInput
            fieldName='NIP'
            name='nip'
            register={register}
            errors={errors}
            isNumeric={true}
            setValue={setValue}
            initialValue={userFields ? userFields.billing.address_2 : null}
          />
          <CustomInput
            fieldName='Nazwa firmy'
            name='companyName'
            register={register}
            errors={errors}
            setValue={setValue}
            initialValue={userFields ? userFields.billing.company : null}
            autoComplete='organization'
          />
          <CustomInput
            fieldName='Kraj / region'
            name='country'
            register={register}
            errors={errors}
            setValue={setValue}
            initialValue={userFields ? userFields.billing.country : null}
            autoComplete='country-name'
          />
          <CustomInput
            fieldName='Miasto'
            name='city'
            register={register}
            errors={errors}
            setValue={setValue}
            initialValue={userFields ? userFields.billing.city : null}
            autoComplete='address-level2'
          />
          <CustomInput
            fieldName='Ulica'
            name='address'
            register={register}
            errors={errors}
            setValue={setValue}
            initialValue={userFields ? userFields.billing.address_1 : null}
            autoComplete='address-line1'
          />
          <CustomInput
            fieldName='Kod pocztowy'
            name='postCode'
            register={register}
            errors={errors}
            isNumeric={true}
            isPost={true}
            setValue={setValue}
            initialValue={userFields ? userFields.billing.postcode : null}
            autoComplete='postal-code'
          />
          {!isLoggedIn && (
            <CustomInput
              fieldName='Hasło'
              name='password'
              register={register}
              errors={errors}
              isPassword={true}
              autoComplete='new-password'
            />
          )}
          {!isLoggedIn && (
            <CustomInput
              fieldName='Powtórz hasło'
              name='confirmPassword'
              register={register}
              errors={errors}
              isPassword={true}
              autoComplete='off'
            />
          )}
          {!isCheckout && (
            <Box className={styles.form__bottom}>
              <CustomInput
                fieldName='Wyrażam zgodę na przetwarzanie danych osobowych.'
                name='terms'
                register={register}
                errors={errors}
                isCheckbox={true}
                autoComplete='off'
              />
              <button
                className='btn-primary btn'
                type='submit'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              {isSubmitSuccessful && !isError && (
                <p style={{ color: variables.successfully }}>
                  The account was created successfully
                </p>
              )}
            </Box>
          )}
          {isError && (
            <p
              style={{ color: variables.error }}
              dangerouslySetInnerHTML={{
                __html: (error as WpWooError).data?.message,
              }}
            />
          )}
        </Box>
        {isCheckout && (
          <Box
            className={`${styles.form__content} ${styles.form__content_shipping}`}
          >
            <CustomInput
              fieldName='Wysłać na inny adres?'
              errors={errors}
              isCheckbox={true}
              onChange={onShippingChange}
              className={styles.form__checkShipping}
              autoComplete='off'
            />
            {isShipping && (
              <Box className={styles.form__wrapper}>
                <CustomInput
                  fieldName='Imię'
                  name='nameShipping'
                  register={register}
                  errors={errors}
                  autoComplete='given-name'
                />
                <CustomInput
                  fieldName='Nazwisko'
                  name='lastNameShipping'
                  register={register}
                  errors={errors}
                  autoComplete='family-name'
                />
                <CustomInput
                  fieldName='Nazwa firmy'
                  name='companyNameShipping'
                  register={register}
                  errors={errors}
                  autoComplete='organization'
                />
                <CustomInput
                  fieldName='Numer telefonu'
                  name='phoneNumberShipping'
                  register={register}
                  errors={errors}
                  isNumeric={true}
                  autoComplete='tel'
                />
                <CustomInput
                  fieldName='Kraj / region'
                  name='countryShipping'
                  register={register}
                  errors={errors}
                  autoComplete='country-name'
                />
                <CustomInput
                  fieldName='Miasto'
                  name='cityShipping'
                  register={register}
                  errors={errors}
                  autoComplete='address-level2'
                />
                <CustomInput
                  fieldName='Ulica'
                  name='addressShipping'
                  register={register}
                  errors={errors}
                  autoComplete='address-line1'
                />
                <CustomInput
                  fieldName='Kod pocztowy'
                  name='postCodeShipping'
                  register={register}
                  errors={errors}
                  isNumeric={true}
                  isPost={true}
                  autoComplete='postal-code'
                />
              </Box>
            )}
            <CustomInput
              fieldName='Uwagi do zamówienia (opcjonalne)'
              isRequire={false}
              name='textarea'
              register={register}
              errors={errors}
              isTextarea={true}
              placeholder='Wprowadź opis...'
            />
          </Box>
        )}
      </form>
    );
  }
);

RegistrationForm.displayName = 'RegistrationForm';
