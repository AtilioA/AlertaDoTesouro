import React, { useRef, useCallback } from 'react';

import { Container } from './styles';
import { FiKey, FiLock, FiUser } from 'react-icons/fi';
import Input from '../../components/Input';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email é obrigatório')
          .email('Digite um email válido'),
        password: Yup.string().min(8, 'Mínimo de 8 caracteres'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

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
        </div>
        <Input
          icon={FiLock}
          name="password"
          type="password"
          placeholder="Sua senha"
        />

        <button type="submit">Entrar</button>

        <a href="forgot">Esqueci minha senha</a>
      </Form>

      <a href="login">
        <FiKey />
        &nbsp; Criar conta
      </a>
    </Container>
  );
};

export default SignIn;
