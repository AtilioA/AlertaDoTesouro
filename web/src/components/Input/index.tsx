import {
  InputHTMLAttributes,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styles';
// import Tooltip from '../Tooltip';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

export default function Input({ name, icon: Icon, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { fieldName, defaultValue: _, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Container
      isFocused={isFocused}
      isFilled={isFilled}
      isErrored={!!error}
      onClick={focusInput}
    >
      <div id="svg-div">{Icon && <Icon size={20} />}</div>
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        {...props}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#e63232" size={20} />
        </Error>
      )}
    </Container>
  );
}

Input.defaultProps = {
  icon: undefined,
};
