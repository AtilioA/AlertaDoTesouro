import React from 'react';

import SignIn from './pages/SignIn';
import Header from './components/Header';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';
import Card from './components/Cards';

const App: React.FC = () => (
  <>
    <Header />
    <Card />
    <SignIn />
    <SignUp />
    <GlobalStyle />
  </>
);

export default App;
