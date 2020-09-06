import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* width: 100%; */
  /* max-width: 700px; */

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

    input {
      margin-left: 5px;
      padding: 10px;
      width: 97%;
      background: #e2e2e2;
      border-radius: 4px;
      border: 2px solid #e2e2e2;
      & + input {
        margin-top: 5px;
      }
    }

    button {
      /* background-color: #3b9eff; */
      color: #ffffff;

      margin: 10px;
      padding: 0 16px;

      border-radius: 4px;
      border: 0;
      box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);

      width: 90%;
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

    a {
      color: #777;
      text-decoration: none;
      transition: color 0.2s;
      &:hover {
        color: ${shade(0.5, '#555')};
      }
    }
  }

  > a {
    color: #3b9fff;
    display: flex;
    align-items: center;
    margin-top: 24px;
    text-decoration: none;

    transition: color 0.2s;
    &:hover {
      color: ${shade(0.2, '#3b9fff')};
    }

    svg {
      margin-right: 5px;
      /* margin-top: auto; */
      /* margin-bottom: auto; */
    }
  }
`;
