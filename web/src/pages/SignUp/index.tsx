import React from 'react';

import { Container } from './styles';
import { FiLogIn } from 'react-icons/fi';
import Input from '../../components/Input';

const SignIn: React.FC = () => (
  <Container>
    <form>
      <div id="form-header">
        <h1>CADASTRO</h1>
      </div>

      <div id="input-header">
        <h2>EMAIL</h2>
      </div>
      <Input name="email" placeholder="Ex: alan@turing.com" />

      <div id="input-header">
        <h2>SENHA</h2>
      </div>
      <Input name="password" type="password" placeholder="Sua senha" />

      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirmação da sua senha"
      />

      <button type="submit">Cadastrar-se</button>
    </form>

    <a href="login">
      <FiLogIn />
      &nbsp; Entrar com minha conta
    </a>
  </Container>
);

export default SignIn;
