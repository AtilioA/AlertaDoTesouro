import React, { useContext, useCallback } from "react";
import { Container } from './styles';
import Toast from './Toast';

import { ToastMessage, ToastContext } from "../../context/ToastContext";

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  return (
    <Container>
      {messages.map((message) => (
        <Toast key={message.id} toastProps={message}/>
      ))}
    </Container>
  );
}

export default ToastContainer;
