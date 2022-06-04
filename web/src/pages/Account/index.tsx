import { useRef, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FiAtSign, FiCheck, FiLock, FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import { Container, AnimationContainer } from './styles';
import api from '../../services/api';

export default function Account() {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();

  const handleDataExport = async () => {
    // GET request + bearer token to data export endpoint
    const userToken = localStorage.getItem('@AlertaDoTesouro:token');
    if (userToken) {
      await api.get('/users/export', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
    } else {
      console.log('No token found for data export');
    }
  };

  // Delete user info from localStorage and redirect user to login page
  const handleLogout = () => {
    // Delete user token from localStorage
    localStorage.removeItem('@AlertaDoTesouro:token');
    localStorage.removeItem('@AlertaDoTesouro:user');

    // Redirect user to login page
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        'Você realmente quer deletar sua conta? Esta ação é irreversível!',
      )
    ) {
      // Send DELETE request to API to delete user account, along with bearer token
      const userToken: string | null = localStorage.getItem(
        '@AlertaDoTesouro:token',
      );
      if (userToken) {
        await api.delete('/users', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        // Simulate logout
        handleLogout();
      }
    }
  };

  const getUserEmail = (): string | undefined => {
    try {
      const userDataString: string | null = localStorage.getItem(
        '@AlertaDoTesouro:user',
      );
      if (userDataString) {
        const user: Record<string, string> = JSON.parse(
          userDataString,
        ) as Record<string, string>;
        if (user) {
          const userEmail: string = user.email;
          return userEmail;
        }
        return 'turing@inf.ufes.br';
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }

    return '';
  };

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email é obrigatório')
          .email('Digite um email válido'),
        password: Yup.string().required('Informe sua senha'),
        newPassword: Yup.string().oneOf(
          [Yup.ref('confirmPassword')],
          'Senhas devem ser iguais',
        ),
        confirmPassword: Yup.string().when(
          'newPassword',
          (newPassword: string, field: Yup.StringSchema) =>
            newPassword
              ? field
                .required('É necessário confirmar sua senha')
                .min(8, 'Mínimo de 8 caracteres')
                .oneOf([Yup.ref('newPassword')], 'Senhas devem ser iguais')
              : field,
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      } else throw err;
    }
  }, []);

  return (
    <Container>
      <AnimationContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div id="form-header">
            <h1>SUAS INFORMAÇÕES</h1>
          </div>

          <div id="input-header">
            <h2>EMAIL</h2>
          </div>
          <Input
            icon={FiAtSign}
            name="email"
            placeholder="turing@inf.ufes.br"
            defaultValue={getUserEmail()}
          />

          <div id="input-header">
            <h2>SENHA</h2>
          </div>
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Sua senha atual"
          />
          <Input
            icon={FiPlus}
            name="newPassword"
            type="password"
            placeholder="Sua nova senha"
          />
          <Input
            icon={FiCheck}
            name="confirmPassword"
            type="password"
            placeholder="Confirmação de sua nova senha"
          />

          <button type="submit">Atualizar dados</button>
          <button
            id="exportar-dados"
            type="button"
            onClick={() => handleDataExport()}
          >
            Exportar dados
          </button>
          <button id="sair" type="button" onClick={() => handleLogout()}>
            Sair
          </button>
          <button
            id="deletar-conta"
            type="button"
            onClick={() => handleDeleteAccount()}
          >
            Deletar conta
          </button>
        </Form>
      </AnimationContainer>
    </Container>
  );
}
