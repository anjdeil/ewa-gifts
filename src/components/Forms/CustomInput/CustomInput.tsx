import { FC } from "react";
import styles from './styles.module.scss';
import { CustomInputProps } from '@/types/Forms';

export const CustomInput: FC<CustomInputProps> = ({
    fieldName,
    name,
    register,
    errors,
    className,
    isRequire = true,
    isPassword = false,
    isCheckbox = false,
}) =>
{
    let type;
    let inputClass = styles.customInput__input;

    if (isPassword)
    {
        type = 'password';
    } else if (isCheckbox)
    {
        type = 'checkbox';
        inputClass = styles.customInput__checkbox;
    }

    return (
        <label className={`${styles.customInput} ${isCheckbox && styles.customInput_checkbox} ${className}`}>
            <span>
                {fieldName}
                {isRequire && <span className={styles.customInput__require}>*</span>}
            </span>
            <input
                {...register(name)}
                style={{ color: 'black' }}
                type={type && type}
                className={inputClass}
            />
            {errors[name] && <p>{errors[name]?.message}</p>}
        </label>
    )
};