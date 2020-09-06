import React from 'react';

import SignIn from './pages/SignIn';
import Header from './components/Header';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';
// import Card from './components/Card';
import Account from './pages/Account';
import Footer from './components/Footer';

import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ToastContainer from './components/ToastContainer';
import AppProvider from './context';

const App: React.FC = () => (
  <>
    <AppProvider>
      <Header />
      <Account />
      {/* <Card /> */}
      <SignIn />
      <SignUp />
      <Footer />
    </AppProvider>
    <GlobalStyle />
  </>
);

export default App;
