import React from 'react';
import { Container, FooterBody} from './styles';

const Footer: React.FC = () => (
  <>
  <Container>
    <FooterBody>
      <p>Built by <a href="github.com/atilioa">AtilioA</a>.</p>
      <p><a id="privacy" href="/privacidade">Privacidade</a></p>
    </FooterBody>
  </Container>
  </>
)

export default Footer;

