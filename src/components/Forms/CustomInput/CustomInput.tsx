import { FC, FormEvent, useEffect, useState } from 'react';
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
  isPost = false,
  placeholder,
  onChange,
  value,
  isTextarea,
  setValue,
  initialValue,
  checked,
  autoComplete,
}) => {
  let type;
  let inputClass = styles.customInput__input;
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  if (isPassword) {
    type = showPassword ? 'text' : 'password';
  } else if (isCheckbox) {
    type = 'checkbox';
    inputClass = styles.customInput__checkbox;
  }

  useEffect(() => {
    if (setValue && name && initialValue !== null && initialValue !== '') {
      setValue(name, initialValue, { shouldValidate: true });
    }
  }, [initialValue, name, setValue]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (setValue) {
      setValue(name, e.currentTarget.value, { shouldValidate: true });
    }
    if (onChange) {
      onChange(e);
    }
  };

  const registerProps = register ? register(name) : {};
  const isError = errors && name ? name in errors : false;

  function numericValidate(e: FormEvent<HTMLInputElement>) {
    const regex = isPost ? /[^0-9-]/g : /[^0-9]/g;
    e.currentTarget.value = e.currentTarget.value.replace(regex, '');
  }

  const commonProps = {
    placeholder,
    ...registerProps,
    style: { color: 'black' },
    className: `${inputClass}
        ${isError && styles.customInput__input_error} 
        ${isTextarea && styles.customInput__input_textarea}`,
    inputMode: isNumeric ? 'numeric' : undefined,
    pattern: isNumeric ? (isPost ? '[0-9\\-]*' : '[0-9]*') : undefined,
    onInput: isNumeric ? numericValidate : undefined,
    onChange: handleChange,
    value,
    checked: isCheckbox ? checked : undefined,
    name,
    autoComplete,
  };

  return (
    <div>
      <label
        className={`${styles.customInput} ${
          isCheckbox && styles.customInput_checkbox
        } ${className}`}
      >
        <span>
          {fieldName}
          {isRequire && <span className={styles.customInput__require}>*</span>}
        </span>
        <div className={styles.customInput__inputWrapper}>
          {isTextarea ? (
            <textarea {...commonProps} />
          ) : (
            <>
              <input type={type || 'text'} {...commonProps} />
              {/* {isCheckbox && <span className={styles.customInput__custCheck} />} */}
            </>
          )}
          {isPassword && (
            <Image
              className={styles.customInput__showPassword}
              src={'/images/showPassword.svg'}
              alt={'show password'}
              width={24}
              height={24}
              onClick={toggleShowPassword}
              unoptimized={true}
            />
          )}
        </div>
      </label>
      {isError && name && (
        <p className={`error ${styles.customInput__error}`}>
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};
