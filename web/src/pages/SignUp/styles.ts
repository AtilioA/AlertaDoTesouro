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
      font-size: 26px;
      text-align: center;
      margin-bottom: 50px;
    }

    div#input-header {
      font-size: 20px;
      text-align: left;
      margin: 5px 5px 5px 14px;
      & + input {
        margin-bottom: 10px;
      }
    }

    input {
      margin-left: 5px;
      padding: 10px;
      width: 97%;
      background: #e2e2e2;
      border-radius: 4px;
      border: 2px solid #e2e2e2;
    }

    button {
      background: #3b9eff;
      color: #ffffff;
      &:hover {
        background: ${shade(0.1, '#3b9fff')};
      }
      transition: background 0.2s;

      margin: 10px;
      padding: 0 16px;

      border-radius: 4px;
      border: 0;
      box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);

      width: 90%;
      height: 42px;

      text-align: center;
      font-weight: bold;
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
      color: ${shade(0.1, '#3b9fff')};
    }

    svg {
      margin-right: 5px;
    }
  }
`;
