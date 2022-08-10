import { useEffect, useState } from 'react';
import { User } from '../../@types/global';
import { Container, Profile } from './styles';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem('@AlertaDoTesouro:token') !== null,
  );
  const [mailAddress, setMailAddress] = useState<string>('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('@AlertaDoTesouro:token') !== null;
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      const mail = localStorage.getItem('@AlertaDoTesouro:user');
      if (!mail) {
        setMailAddress('user');
      } else {
        setMailAddress((JSON.parse(mail) as User).email);
      }
    }
  }, [localStorage.getItem('@AlertaDoTesouro:token')]);

  return (
    <Container>
      <nav>
        {/* <Link to="/dashboard">Dashboard</Link> */}
        <a href="/">Alerta do Tesouro</a>
      </nav>

      <aside>
        <Profile>
          <a href="/dashboard">Dashboard</a>
        </Profile>

        {isLoggedIn && mailAddress ? (
          <>
            <a href="/notificacoes">Notificações</a>
            <a href="/conta">{mailAddress}</a>
          </>
        ) : (
          <a href="/login">
            <button type="submit">Logar</button>
          </a>
        )}
      </aside>
    </Container>
  );
}
