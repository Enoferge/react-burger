import { useState } from 'react';
type TUseFormResult<T> = {
  values: T;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setValues: (values: T) => void;
  reset: () => void;
};

export function useForm<T extends Record<string, string>>(
  initialValues: T
): TUseFormResult<T> {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  const reset = (): void => {
    setValues(initialValues);
  };

  return { values, handleChange, setValues, reset };
}
