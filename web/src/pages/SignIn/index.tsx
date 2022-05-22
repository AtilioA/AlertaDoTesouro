import React, { useRef, useCallback, useContext } from 'react';

import { Container, AnimationContainer } from './styles';
import { FiKey, FiLock, FiAtSign } from 'react-icons/fi';
import Input from '../../components/Input';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import { ToastContext } from '../../context/ToastContext';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, signIn } = useContext(AuthContext);
  const { addToast, removeToast } = useContext(ToastContext);

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email é obrigatório')
          .email('Digite um email válido'),
        password: Yup.string().required('Informe sua senha'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password
      });

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      } else {
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login. Cheque suas credenciais.'
        });
      }
    }
  }, [signIn]);

  return (
    <Container>
      <AnimationContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div id="form-header">
            <h1>LOGIN</h1>
          </div>

          <div id="input-header">
            <h2>EMAIL</h2>
          </div>
          <Input icon={FiAtSign} name="email" placeholder="Ex: alan@turing.com" />

          <div id="input-header">
            <h2>SENHA</h2>
            <Link to="forgot">Esqueci minha senha</Link>
          </div>
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Sua senha"
          />

          <button type="submit">Entrar</button>
        </Form>

        <Link to="registrar">
          <FiKey />
          &nbsp; Criar conta
        </Link>
      </AnimationContainer>
    </Container>
  );
};

export default SignIn;
