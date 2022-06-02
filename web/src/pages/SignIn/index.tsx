import { useRef, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { FiKey, FiLock, FiAtSign } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import { Container, AnimationContainer } from './styles';

import { AuthContext } from '../../context/AuthContext';
import { ToastContext } from '../../context/ToastContext';

interface SignInFormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();

  const { user: _user, signIn } = useContext(AuthContext);
  const { addToast, removeToast: _removeToast } = useContext(ToastContext);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email é obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().required('Informe sua senha'),
        });Poss

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        navigate('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Erro na autenticação',
            description:
              'Ocorreu um erro ao fazer login. Cheque suas credenciais ou verifique seu e-mail.',
          });
        }
      }
    },
    [signIn],
  );

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
          <Input
            icon={FiAtSign}
            name="email"
            placeholder="Ex: turing@inf.ufes.br"
          />

          <div id="input-header">
            <h2>SENHA</h2>
            <Link to="esqueci-minha-senha">Esqueci minha senha</Link>
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
}
