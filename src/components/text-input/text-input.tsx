import { Input } from '@krgaa/react-developer-burger-ui-components';
import { useRef, useState } from 'react';

import type React from 'react';

const validateText = (_text: string): boolean => {
  return true;
};

type TEmailInputInterface = {
  value: string;
  size?: 'default' | 'small';
  placeholder?: string;
  isIcon?: boolean;
  extraClass?: string;
  errorText?: string;
  checkValid?: (isValid: boolean) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & Omit<React.HTMLProps<HTMLInputElement>, 'size' | 'type' | 'ref'>;

export const TextInput: React.FC<TEmailInputInterface> = ({
  value,
  errorText = 'Ой, произошла ошибка!',
  checkValid,
  onChange,
  size = 'default',
  placeholder = 'Текст',
  isIcon = false,
  extraClass = '',
  ...rest
}) => {
  const [fieldDisabled, setDisabled] = useState(isIcon);

  const [error, setError] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const onIconClick = (): void => {
    setDisabled(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const validateField = (value: string): void => {
    const isValid = validateText(value);
    setError(!isValid);
    checkValid?.(isValid);
  };

  const onFocus = (): void => {
    setError(false);
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (e.target.value) {
      validateField(e.target.value);
    } else {
      setError(false);
    }
    if (isIcon) {
      setDisabled(true);
    }
  };

  return (
    <Input
      type="email"
      placeholder={placeholder}
      onChange={onChange}
      icon={isIcon ? 'EditIcon' : undefined}
      value={value}
      ref={inputRef}
      onBlur={onBlur}
      onFocus={onFocus}
      error={error}
      disabled={fieldDisabled}
      onIconClick={onIconClick}
      errorText={errorText}
      size={size}
      extraClass={extraClass}
      {...rest}
    />
  );
};
