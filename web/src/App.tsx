import React from 'react';

import SignIn from './pages/SignIn';
import Header from './components/Header';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';
// import Card from './components/Card';
import Account from './pages/Account';
import Footer from './components/Footer';

import AuthContext from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthContext.Provider value={{email: 'Atílio'}}>
      <Header />
      <Account />
      {/* <Card /> */}
      <SignIn />
      <SignUp />
      <Footer />
    </AuthContext.Provider>
    <GlobalStyle />
  </>
);

export default App;
