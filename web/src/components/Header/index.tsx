import React from 'react';
import { Container, Profile } from './styles';

const Header: React.FC = () => (
  <Container>
    <nav>
      {/* <Link to="/dashboard">Dashboard</Link> */}
      <a href="/">Alerta do Tesouro</a>
    </nav>

    <aside>
      <Profile>
        <a href="/dashboard">Dashboard</a>

        <a href="/notificacoes">Notificações</a>

        <a href="/conta">Conta</a>
      </Profile>

      <a href="/login">
        <button>Logar</button>
      </a>
    </aside>
  </Container>
);

export default Header;
