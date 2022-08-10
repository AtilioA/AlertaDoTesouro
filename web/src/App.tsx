import { BrowserRouter } from 'react-router-dom';

import { useEffect, useState } from 'react';
import Header from './components/Header';
import GlobalStyle from './styles/global';
import Footer from './components/Footer';
// import Card from './components/Card';

import AppProvider from './context';
import Routes from './routes';
import type { User } from './@types/global';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem('@AlertaDoTesouro:token') !== null,
  );
  return (
    <BrowserRouter>
      <AppProvider>
        <Header isLoggedIn={isLoggedIn} />
        <Routes setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        <Footer />
      </AppProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}
