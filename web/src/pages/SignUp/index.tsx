import { useCallback, useRef, useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { FiLogIn, FiLock, FiAtSign, FiCheck } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Input from '../../components/Input';
import { Container } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import { AnimationContainer } from '../SignIn/styles';
import api from '../../config/axios';
import { ToastContext } from '../../context/ToastContext';

interface SignUpFormData {
  email: string;
  password: string;
}

export default function SignUp() {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useContext(ToastContext);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        setButtonLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email é obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().min(8, 'Mínimo de 8 caracteres'),
          confirmPassword: Yup.string().when(
            'password',
            (password: string, field: Yup.StringSchema) =>
              password
                ? field
                    .required('Senhas devem ser iguais')
                    .oneOf([Yup.ref('password')], 'Senhas devem ser iguais')
                : field,
          ),
          acceptTerms: Yup.bool().oneOf(
            [true],
            'É necessário concordar com os Termos para concluir o cadastro',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        addToast({
          type: 'info',
          title: 'Cadastro realizado com sucesso!',
          description: 'Por favor, cheque seu email para confirmar sua conta.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description:
              'Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde.',
          });
        }
      } finally {
        setButtonLoading(false);
      }
    },
    [addToast],
  );

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
          <Input
            autoFocus
            icon={FiAtSign}
            name="email"
            placeholder="Ex: turing@inf.ufes.br"
          />

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
          <label htmlFor="acceptTerms">
            Aceito os{' '}
            <a href="/privacidade">Termos e Condições Gerais de Uso</a>
          </label>

          <button disabled={buttonLoading} type="submit">
            Cadastrar-se
          </button>
        </Form>

        <Link to="/login">
          <FiLogIn />
          &nbsp; Entrar com minha conta
        </Link>
      </AnimationContainer>
    </Container>
  );
}
