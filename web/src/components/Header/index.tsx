import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { User } from '../../@types/global';
import { Container, Profile } from './styles';

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  const activeStyle = {
    textDecoration: 'underline',
    // fontWeight: 'bold',
    // A colored background with round corners
    backgroundColor: '#efefef',
    color: '#173a6e',
    borderRadius: '5px',
    padding: '5px',
  };
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <Container>
      <nav>
        {/* <NavLink             style={({ isActive }) =>
              isActive ? activeStyle : {}
            } to="/dashboard">Dashboard</NavLink> */}
        <NavLink to="/">Alerta do Tesouro</NavLink>
      </nav>

      <aside>
        <Profile>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/dashboard"
          >
            Dashboard
          </NavLink>
        </Profile>

        {isLoggedIn ? (
          <>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : {})}
              to="/notificacoes"
            >
              Notificações
            </NavLink>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : {})}
              to="/conta"
            >
              {
                (
                  JSON.parse(
                    localStorage.getItem('@AlertaDoTesouro:user')!,
                  ) as User
                ).email
              }
            </NavLink>
          </>
        ) : (
          <NavLink
            // style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/login"
          >
            <button type="submit">Logar</button>
          </NavLink>
        )}
      </aside>
    </Container>
  );
}
