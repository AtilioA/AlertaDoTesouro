import React from 'react';
import { Container, FooterBody } from './styles';

const Footer: React.FC = () => (
  <>
    <Container>
      <FooterBody>
        <p>
          Feito por{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://www.github.com/AtilioA/AlertaDoTesouro">
            AtilioA
          </a>
          .
        </p>
        <p>
          <a id="privacy" href="/privacidade">
            Privacidade
          </a>
        </p>
      </FooterBody>
    </Container>
  </>
);

export default Footer;
