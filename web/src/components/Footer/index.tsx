import { Container, FooterBody } from './styles';

export default function Footer() {
  return (
    <Container>
      <FooterBody>
        <p>
          Feito por{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.github.com/AtilioA/AlertaDoTesouro"
          >
            AtilioA
          </a>{' '}
          e{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.github.com/Henriquelay"
          >
            Henriquelay
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
  );
}
