import React from 'react';

import SignIn from './pages/SignIn';
import Header from './components/Header';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';
// import Card from './components/Card';
import Account from './pages/Account';
import Footer from './components/Footer';

const App: React.FC = () => (
  <>
    <Header />
    <Account />
    {/* <Card /> */}
    <SignIn />
    <SignUp />
    <Footer />
    <GlobalStyle />
  </>
);

export default App;
