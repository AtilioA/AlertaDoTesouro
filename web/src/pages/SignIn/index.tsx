import React from 'react';

import { Container } from './styles';
import { FiKey } from 'react-icons/fi';
import Input from '../../components/Input';
import { Form } from '@unform/web';

const SignIn: React.FC = () => {
  function handleSubmit(data: object): void {
    console.log(data);
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <div id="form-header">
          <h1>LOGIN</h1>
        </div>

        <div id="input-header">
          <h2>EMAIL</h2>
        </div>
        <Input name="email" placeholder="Ex: alan@turing.com" />

        <div id="input-header">
          <h2>SENHA</h2>
        </div>
        <Input name="password" type="password" placeholder="Sua senha" />

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
