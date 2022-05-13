import React, { useCallback, useRef, useContext } from 'react';

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

interface SignUpFormData {
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useContext(ToastContext);

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        password: Yup.string().min(8, 'Mínimo de 8 caracteres'),
        confirmPassword: Yup.string().when(
          'password',
          (password: string, field: any) =>
            password
              ? field
                  .required('Senhas não batem')
                  .oneOf([Yup.ref('password')], 'Senhas não batem')
              : field,
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);

      addToast({
        type: 'info',
        title: "Senha redefinida com sucesso!",
        description: 'Agora você pode utilizar a nova senha para fazer login.'
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      } else {
        addToast({
          type: 'error',
          title: 'Erro na redefinição de senha',
          description: 'Ocorreu um erro ao redefinir sua senha. Por favor, tente novamente.'
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

          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Sua nova senha"
          />

          <Input
            icon={FiCheck}
            name="confirmPassword"
            type="password"
            placeholder="Confirmação da senha"
          />

          {/* TODO: Improve icon spacing */}
          <button type="submit">
            < FiRefreshCcw />
            {" "} Redefinir senha</button>
        </Form>
      </AnimationContainer>
    </Container>
  );
};

export default SignUp;
