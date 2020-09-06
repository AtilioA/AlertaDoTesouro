import React, { useCallback } from 'react';

import { Container } from './styles';
import { FiLogIn, FiLock, FiUser, FiArrowUp, FiCheck } from 'react-icons/fi';
import { MdLock } from 'react-icons/md';
import Input from '../../components/Input';
import { Form } from '@unform/web';
import * as Yup from 'yup';

const SignIn: React.FC = () => {
  const handleSubmit = useCallback(async (data: object) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email é obrigatório')
          .email('Digite um email válido'),
        password: Yup.string()
          .min(8, 'Mínimo de 8 caracteres'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
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
