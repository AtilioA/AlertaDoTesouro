import styled, { keyframes } from 'styled-components';
import { desaturate, shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;

  form {
    /* margin: 80px; */
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    div#form-header {
      font-size: 20px;
      text-align: center;
      margin-bottom: 50px;
      /* padding-bottom: 50px; */
    }

    div#input-header {
      font-size: 20px;
      text-align: left;
      margin: 5px 5px 5px 14px;
    }

    button {
      color: #ffffff;

      margin-top: 15px;
      margin-bottom: -10px;

      padding: 0 16px;

      border-radius: 4px;
      border: 0;
      box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);

      width: 100%;
      height: 42px;

      background: #3b9eff;

      text-align: center;
      font-weight: bold;

      transition: background 0.2s;
      &:hover {
        background: ${shade(0.1, '#3b9fff')};
      }
      &#exportar-dados {
        background: #00aa33;
        &:hover {
          background: ${shade(0.1, '#00AA33')};
        }
        /* Reduce saturation when button is disabled */
        &:disabled {
          background: ${desaturate(0.8, '#00AA33')};
          transition: background 0.2s;
        }
      }
      &#atualizar-dados {
        &:disabled {
          background: ${desaturate(0.8, '#3b9eff')};
          transition: background 0.2s;
        }
      }
      &#sair {
        margin-top: 50px;
        background: #f64c75;
        &:hover {
          background: ${shade(0.1, '#F64C75')};
        }
      }
      &#deletar-conta {
        background: #ff1818;
        &:hover {
          background: ${shade(0.1, '#FF1818')};
        }
      }
    }
  }
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const AnimationContainer = styled.div`
  animation: ${appearFromLeft} 1s;
`;
