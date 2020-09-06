import React from "react";
import { Container, Toast } from './styles';
import { FiAlertTriangle, FiXCircle, FiCheck, FiAlertCircle } from "react-icons/fi";

const ToastContainer: React.FC = () => {
  return (
    <Container>
      <Toast hasDescription>
        <FiAlertCircle size={20}/>
        <div>
          <strong>Informação.</strong>
          <p>Descrição.</p>
        </div>

        <button type="button">
          <FiXCircle size={16} />
        </button>
      </Toast>
      <Toast type="success">
        <FiCheck size={20}/>
        <div>
          <strong>Sucesso!</strong>
        </div>

        <button type="button">
          <FiXCircle size={16} />
        </button>
      </Toast>
      <Toast type="error" hasDescription>
        <FiAlertTriangle size={20}/>
        <div>
          <strong>Ocorreu um erro!</strong>
          <p>Não foi possível...</p>
        </div>

        <button type="button">
          <FiXCircle size={16} />
        </button>
      </Toast>
    </Container>
  );
}

export default ToastContainer;
