import { FC, useState } from "react";
import styles from './styles.module.scss';
import { CustomInputProps } from '@/types/Forms';
import Image from 'next/image';
export const CustomInput: FC<CustomInputProps> = ({
    fieldName,
    name,
    register,
    errors,
    className,
    isRequire = true,
    isPassword = false,
    isCheckbox = false,
    isNumeric = false,
}) =>
{
    let type;
    let inputClass = styles.customInput__input;
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () =>
    {
        setShowPassword(prevState => !prevState);
    };


    if (isPassword)
    {
        type = showPassword ? 'text' : 'password';
    } else if (isCheckbox)
    {
        type = 'checkbox';
        inputClass = styles.customInput__checkbox;
    }

    return (
        <div>
            <label className={`${styles.customInput} ${isCheckbox && styles.customInput_checkbox} ${className}`}>
                <span>
                    {fieldName}
                    {isRequire && <span className={styles.customInput__require}>*</span>}
                </span>
                <div className={styles.customInput__inputWrapper}>
                    <input
                        {...register(name)}
                        style={{ color: 'black' }}
                        type={type && type}
                        className={`${inputClass} ${errors[name] && styles.customInput__input_error}`}
                        inputMode={isNumeric ? "numeric" : undefined}
                        pattern={isNumeric ? "[0-9]*" : undefined}
                        onInput={isNumeric ? (e) =>
                        {
                            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                        } : undefined}
                    />
                    {
                        isPassword &&
                        <Image
                            className={styles.customInput__showPassword}
                            src={'/images/showPassword.svg'}
                            alt={'show password'}
                            width={24}
                            height={24}
                            onClick={toggleShowPassword}
                        />
                    }
                </div>
            </label>
            {errors[name] && <p className={styles.customInput__error}>{errors[name]?.message}</p>}
        </div>
    )
};