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

interface SignUpFormData {
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useContext(ToastContext);

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email é obrigatório')
          .email('Digite um email válido'),
        password: Yup.string().min(8, 'Mínimo de 8 caracteres'),
        confirmPassword: Yup.string().when(
          'password',
          (password: string, field: any) =>
            password
              ? field
                .required('Senhas devem ser iguais')
                .oneOf([Yup.ref('password')], 'Senhas devem ser iguais')
              : field,
        ),
        acceptTerms: Yup.bool()
          .oneOf([true], 'É necessário concordar com os Termos para concluir o cadastro'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);

      addToast({
        type: 'info',
        title: "Cadastro realizado com sucesso!",
        description: 'Por favor, cheque seu email para confirmar sua conta.'
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      } else {
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde.'
        });
      }
    }
  }, [addToast]);

  return (
    <Container>
      <AnimationContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div id="form-header">
            <h1>CADASTRO</h1>
          </div>

          <div id="input-header">
            <h2>EMAIL</h2>
          </div>
          <Input icon={FiUser} name="email" placeholder="Ex: alan@turing.com" />

          <div id="input-header">
            <h2>SENHA</h2>
          </div>
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Sua senha"
          />

          <Input
            icon={FiCheck}
            name="confirmPassword"
            type="password"
            placeholder="Confirmação da sua senha"
          />

          <input required name="acceptTerms" type="checkbox" id="acceptTerms" />
          <label htmlFor="acceptTerms"> Aceito os <a href='/privacidade'>Termos e Condições Gerais de Uso</a></label>

          <button type="submit">Cadastrar-se</button>
        </Form>

        <Link to="login">
          <FiLogIn />
          &nbsp; Entrar com minha conta
        </Link>
      </AnimationContainer>
    </Container>
  );
};

export default SignUp;
