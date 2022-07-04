import { useEffect } from 'react';

import { FiCheck } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import { Container } from '../SignUp/styles';
import { AnimationContainer } from '../SignIn/styles';
import api from '../../services/api';

export default function ConfirmAccount() {
  // const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();

  // Execute the function when the component is mounted
  useEffect(() => {
    // Get token from URL query params and send it to the backend endpoint
    try {
      const token: string | null = new URLSearchParams(
        window.location.search,
      ).get('token');

      if (token) {
        api
          .get(`/email/confirmation/${token}`)
          .then(() => {
            navigate('/login');
          })
          .catch(err => {
            console.log(err);
            throw new Error('Token de autenticação JWT inválido.');
          });
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Link de redefinição inválido: ${err.message}`);
      }
    }

    // addToast({
    //   type: 'success',
    //   title: 'Conta confirmada com sucesso!',
    //   description:
    //     'Agora você pode utilizar a sua conta para fazer login.',
    // });

    navigate('/login');
  }, [navigate]);

  return (
    <Container>
      <AnimationContainer>
        <FiCheck /> <h1> Sua conta foi confirmada com sucesso!</h1>
      </AnimationContainer>
    </Container>
  );
}
