import { User } from '../../@types/global';
import { Container, Profile } from './styles';

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  console.log('HEADER', isLoggedIn);
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

        {isLoggedIn ? (
          <>
            <a href="/notificacoes">Notificações</a>
            <a href="/conta">
              {
                (
                  JSON.parse(
                    localStorage.getItem('@AlertaDoTesouro:user')!,
                  ) as User
                ).email
              }
            </a>
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
