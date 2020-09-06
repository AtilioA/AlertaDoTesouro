import React, { useRef, useCallback, useContext } from 'react';

import { Container } from './styles';
import { FiKey, FiLock, FiUser } from 'react-icons/fi';
import Input from '../../components/Input';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

import { AuthContext } from '../../context/AuthContext';
import { ToastContext } from '../../context/ToastContext';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const {user, signIn} = useContext(AuthContext);
  const {addToast, removeToast} = useContext(ToastContext);

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email é obrigatório')
          .email('Digite um email válido'),
        password: Yup.string().required('Informe sua senha'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password
      });

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      } else {
        addToast();
      }
    }
  }, [signIn]);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div id="form-header">
          <h1>LOGIN</h1>
        </div>

        <div id="input-header">
          <h2>EMAIL</h2>
        </div>
        <Input icon={FiUser} name="email" placeholder="Ex: alan@turing.com" />

        <div id="input-header">
          <h2>SENHA</h2>
          <a href="forgot">Esqueci minha senha</a>
        </div>
        <Input
          icon={FiLock}
          name="password"
          type="password"
          placeholder="Sua senha"
        />

        <button type="submit">Entrar</button>
      </Form>

      <a href="login">
        <FiKey />
        &nbsp; Criar conta
      </a>
    </Container>
  );
};

export default SignIn;
