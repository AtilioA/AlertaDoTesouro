import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;

  form {
    margin: 80px;
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

      margin-top: 10px;
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
      &#sair {
        margin-top: 75px;
        background: #f64c75;
        margin-bottom: -5px;
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
