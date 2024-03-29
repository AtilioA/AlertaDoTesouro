/* eslint-disable no-alert */
import { useRef, useCallback, useState } from 'react';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import {
  FiAtSign,
  FiCheck,
  FiFileText,
  FiLock,
  FiLogOut,
  FiPlus,
  FiRefreshCcw,
  FiUserX,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import { Container, AnimationContainer } from './styles';
import api from '../../config/axios';

interface PasswordUpdateFormData {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export default function Account({
  setIsLoggedIn,
}: {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();
  const [exportButtonLoading, setExportButtonLoading] = useState(false);
  const [updateButtonLoading, setUpdateButtonLoading] = useState(false);

  const handleDataExport = async () => {
    // GET request + bearer token to data export endpoint
    setExportButtonLoading(true);
    const userToken = localStorage.getItem('@AlertaDoTesouro:token');
    if (userToken) {
      await api.get('/users/export', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
    } else {
      console.log('No token found for data export');
      setExportButtonLoading(false);
    }
  };

  // Delete user info from localStorage and redirect user to login page
  const handleLogout = () => {
    // Delete user token from localStorage
    localStorage.removeItem('@AlertaDoTesouro:token');
    localStorage.removeItem('@AlertaDoTesouro:user');
    localStorage.clear();
    sessionStorage.clear();

    setIsLoggedIn(false);
    // Redirect user to landing page
    navigate('/');
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

        // Logout
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
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }

    return '';
  };

  const handlePasswordUpdate = useCallback(
    async (data: PasswordUpdateFormData) => {
      setUpdateButtonLoading(true);
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

        await api.put('/users', data);

        console.log('Senha atualizada com sucesso.');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          console.error(
            'Ocorreu um erro ao atualizar a senha. Tente novamente mais tarde.',
          );
        }
      } finally {
        setUpdateButtonLoading(false);
      }
    },
    [],
  );

  return (
    <Container>
      <AnimationContainer>
        <Form ref={formRef} onSubmit={handlePasswordUpdate}>
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

          {/* 'Form' Submit */}
          <button
            id="atualizar-senha"
            type="submit"
            disabled={updateButtonLoading}
          >
            <FiRefreshCcw />
            Atualizar senha
          </button>

          {/* Data export */}
          <button
            id="exportar-dados"
            type="button"
            onClick={() => handleDataExport()}
            disabled={exportButtonLoading}
          >
            <FiFileText />
            Exportar dados
          </button>

          {/* Logout */}
          <button id="sair" type="button" onClick={() => handleLogout()}>
            <FiLogOut />
            Sair
          </button>

          {/* Account deletion */}
          <button
            id="deletar-conta"
            type="button"
            onClick={() => handleDeleteAccount()}
          >
            <FiUserX />
            Deletar conta
          </button>
        </Form>
      </AnimationContainer>
    </Container>
  );
}
