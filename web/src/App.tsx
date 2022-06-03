import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import GlobalStyle from './styles/global';
import Footer from './components/Footer';
// import Card from './components/Card';

import AppProvider from './context';
import Routes from './routes';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Header />
        <Routes />
        <Footer />
      </AppProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}
