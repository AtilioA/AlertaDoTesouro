import { useCallback, useRef, useContext } from 'react';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail, FiAtSign } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';
import { ToastContext } from '../../context/ToastContext';
import { Container } from '../SignUp/styles';
import { AnimationContainer } from '../SignIn/styles';
import Input from '../../components/Input';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
  password: string;
}

export default function ForgotPassword() {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useContext(ToastContext);

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email é obrigatório')
            .email('Digite um email válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users/reset-password', data);

        addToast({
          type: 'success',
          title: 'Solicitação recebida com sucesso!',
          description: 'Por favor, cheque seu email para redefinir sua senha.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          console.log(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Erro na solicitação',
            description:
              'Ocorreu um erro ao solicitar redefinição de senha. Verifique se este realmente é o e-mail utilizado para sua conta.',
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

          <div id="input-header">
            <h3>Informe o e-mail de sua conta para redefinir sua senha:</h3>
          </div>
          <Input
            autoFocus
            icon={FiAtSign}
            name="email"
            placeholder="Ex: alan@turing.com"
          />

          {/* TODO: Improve icon spacing */}
          <button type="submit">
            <FiMail /> Redefinir senha
          </button>
        </Form>
      </AnimationContainer>
    </Container>
  );
}
