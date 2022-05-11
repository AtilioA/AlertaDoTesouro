import React, { useCallback, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';
import { FiLogIn, FiLock, FiUser, FiCheck } from 'react-icons/fi';
import Input from '../../components/Input';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { AnimationContainer } from '../SignIn/styles';
import api from '../../services/api';
import { ToastContext } from '../../context/ToastContext';

interface ForgotPasswordFormData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useContext(ToastContext);

  const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
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

      await api.post('/users', data);

      addToast({
        type: 'info',
        title: "Solicitação recebida com sucesso!",
        description: 'Por favor, cheque seu email para redefinir sua senha.'
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        console.log(errors);

        return;
      } else {
        addToast({
          type: 'error',
          title: 'Erro na solicitação',
          description: 'Ocorreu um erro ao solicitar redefinição de senha. Verifique se este realmente é o e-mail utilizado para sua conta.'
        });
      }
    }
  }, [addToast]);

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
          <Input icon={FiUser} name="email" placeholder="Ex: alan@turing.com" />

          <button type="submit">Solicitar redefinição de senha</button>
        </Form>

        <Link to="login">
          <FiLogIn />
          &nbsp; Entrar com minha conta
        </Link>
      </AnimationContainer>
    </Container>
  );
};

export default ForgotPassword;
