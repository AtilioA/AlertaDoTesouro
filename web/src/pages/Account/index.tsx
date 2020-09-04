import React from 'react';

import { Container } from './styles';
import Input from '../../components/Input';

const Account: React.FC = () => (
  <Container>
    <form>
      <div id="form-header">
        <h1>SUAS INFORMAÇÕES</h1>
      </div>

      <div id="input-header">
        <h2>EMAIL</h2>
      </div>
      <Input name="email" placeholder="alan@turing.com" />

      <div id="input-header">
        <h2>SENHA</h2>
      </div>
      <Input name="password" type="password" placeholder="Sua senha atual" />
      <Input name="newPassword" type="password" placeholder="Sua nova senha" />
      <Input name="confirmPassword" type="password" placeholder="Confirmação de sua nova senha" />

      <button type="submit">Atualizar dados</button>
      <button id="sair" type="submit">Sair</button>
      <button id="deletar-conta" type="submit">Deletar conta</button>

    </form>
  </Container>
);

export default Account;
