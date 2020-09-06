import React, { useRef, useCallback } from 'react';

import { Container } from './styles';
import Input from '../../components/Input';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors';
import { Form } from '@unform/web';
import { FiUser, FiCheck, FiLock, FiPlus } from 'react-icons/fi';

const Account: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email é obrigatório')
          .email('Digite um email válido'),
        password: Yup.string().required('Informe sua senha'),
        newPassword: Yup.string().oneOf([Yup.ref('confirmPassword')], 'Senhas não batem'),
        confirmPassword: Yup.string().when(
          'newPassword',
          (newPassword: string, field: any) =>
            newPassword
              ? field
                  .required('É necessário confirmar sua senha').min(8, 'Mínimo de 8 caracteres').oneOf([Yup.ref('newPassword')], 'Senhas não batem')
              : field,
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);

      return;
    }
  }, []);

  return (
  <Container>
    <Form ref={formRef} onSubmit={handleSubmit}>
      <div id="form-header">
        <h1>SUAS INFORMAÇÕES</h1>
      </div>

      <div id="input-header">
        <h2>EMAIL</h2>
      </div>
      <Input icon={FiUser} name="email" placeholder="alan@turing.com" />

      <div id="input-header">
        <h2>SENHA</h2>
      </div>
      <Input icon={FiLock} name="password" type="password" placeholder="Sua senha atual" />
      <Input icon={FiPlus} name="newPassword" type="password" placeholder="Sua nova senha" />
      <Input icon={FiCheck} name="confirmPassword" type="password" placeholder="Confirmação de sua nova senha" />

      <button type="submit">Atualizar dados</button>
      <button id="sair" type="submit">Sair</button>
      <button id="deletar-conta" type="submit">Deletar conta</button>

    </Form>
  </Container>
  );
}

export default Account;
