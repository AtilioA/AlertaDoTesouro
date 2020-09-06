import React, { useContext, useEffect } from 'react'
import { Container } from './styles'
import { FiAlertTriangle, FiXCircle, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { ToastMessage, ToastContext } from '../../../context/ToastContext';

interface ToastProps {
  toastProps: ToastMessage
  style: object;
}

const icons = {
  info: <FiAlertCircle size={20}/>,
  success: <FiCheckCircle size={20}/>,
  error: <FiAlertTriangle size={20}/>,
}

const Toast: React.FC<ToastProps> = ({ toastProps, style }) => {
  const { removeToast } = useContext(ToastContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toastProps.id);
    }, 5000);

    return () => {
      clearTimeout(timer);
    }
  }, [removeToast, toastProps.id]);

  return (
    <Container style={style} type={toastProps.type} hasDescription={!!toastProps.description}>
      {icons[toastProps.type || 'info']}
      <div>
        <strong>{toastProps.title}</strong>
        {toastProps.description && <p>{toastProps.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(toastProps.id)}>
        <FiXCircle size={20} />
      </button>
    </Container>
  );
};

export default Toast;
