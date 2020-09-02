import React from 'react';

import SignIn from './pages/SignIn';
import Header from './components/Header';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <Header/>
    <SignIn />
    <SignUp />
    <GlobalStyle />
  </>
);

export default App;
