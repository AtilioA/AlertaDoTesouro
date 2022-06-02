import React, { useCallback, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from '../SignUp/styles';
import { FiLock, FiCheck, FiRefreshCcw } from 'react-icons/fi';
import Input from '../../components/Input';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { AnimationContainer } from '../SignIn/styles';
import api from '../../services/api';
import { ToastContext } from '../../context/ToastContext';

interface ResetPasswordFormData {
  newPassword: string;
  newPasswordConfirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useContext(ToastContext);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          newPassword: Yup.string().min(8, 'Mínimo de 8 caracteres'),
          newPasswordConfirmation: Yup.string().when(
            'newPassword',
            (newPassword: string, field: any) =>
              newPassword
                ? field
                    .required('Senhas devem ser iguais')
                    .oneOf([Yup.ref('newPassword')], 'Senhas devem ser iguais')
                : field,
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // Get token from URL query params and send it to the backend endpoint
        try {
          const token: string | null = new URLSearchParams(
            window.location.search,
          ).get('token');

          await api.put(`/users/reset-password/${token}`, data);
        } catch (err) {
          if (err instanceof Error) {
            console.log(`Link de redefinição inválido: ${err.message}`);
          }
        }

        addToast({
          type: 'success',
          title: 'Senha redefinida com sucesso!',
          description:
            'Agora você pode utilizar a nova senha para fazer login.',
        });

        history.push('/login');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        } else {
          addToast({
            type: 'error',
            title: 'Erro na redefinição de senha',
            description:
              'Ocorreu um erro ao redefinir sua senha. Por favor, solicite outro e-mail de redefinição de senha.',
          });
        }
      }
    },
    [addToast],
  );

  return (
    <Container>
      <AnimationContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div id="form-header">
            <h1>REDEFINIR SENHA</h1>
          </div>

          <Input
            icon={FiLock}
            name="newPassword"
            type="password"
            placeholder="Sua nova senha"
          />

          <Input
            icon={FiCheck}
            name="newPasswordConfirmation"
            type="password"
            placeholder="Confirmação da senha"
          />

          {/* TODO: Improve icon spacing */}
          <button type="submit">
            <FiRefreshCcw /> Redefinir senha
          </button>
        </Form>
      </AnimationContainer>
    </Container>
  );
};

export default ResetPassword;