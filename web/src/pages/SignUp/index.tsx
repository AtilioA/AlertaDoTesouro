import React, { useCallback, useRef } from 'react';

import { Container } from './styles';
import { FiLogIn, FiLock, FiUser, FiArrowUp, FiCheck } from 'react-icons/fi';
import Input from '../../components/Input';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
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
        confirmPassword: Yup.string().when(
          'password',
          (password: string, field: any) =>
            password
              ? field
                  .required('Senhas não batem')
                  .oneOf([Yup.ref('password')], 'Senhas não batem')
              : field,
        ),
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
          <h1>CADASTRO</h1>
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

        <Input
          icon={FiCheck}
          name="confirmPassword"
          type="password"
          placeholder="Confirmação da sua senha"
        />

        <button type="submit">Cadastrar-se</button>
      </Form>

      <a href="login">
        <FiLogIn />
        &nbsp; Entrar com minha conta
      </a>
    </Container>
  );
};

export default SignIn;
