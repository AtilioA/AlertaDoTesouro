import React from "react";
import { Container } from './styles';
import Toast from './Toast';
import { useTransition } from 'react-spring'
import { ToastMessage } from "../../context/ToastContext";

interface ToastContainerProps {
  messages: ToastMessage[];
}
const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransition = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-110%', opacity: '0'},
      enter: { right: '0', opacity: 1},
      leave: { right: '-110%', opacity: 0 },
    } );

  return (
    <Container>
      {messagesWithTransition.map(({item, key, props}) => (
        <Toast key={key} style={props} toastProps={item}/>
      ))}
    </Container>
  );
}

export default ToastContainer;
