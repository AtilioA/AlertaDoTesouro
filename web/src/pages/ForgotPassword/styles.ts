import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  /* height: 100vh; */
  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;

  Form {
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
    }

    button {
      background: #3b9eff;
      color: #ffffff;
      &:hover {
        background: ${shade(0.1, '#3b9fff')};
      }
      transition: background 0.2s;

      margin-top: 10px;
      padding: 0 16px;

      border-radius: 4px;
      border: 0;
      box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);

      width: 100%;
      height: 42px;

      text-align: center;
      font-weight: bold;
    }
  }

  a {
    color: #3b9fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    text-decoration: none;

    transition: color 0.2s;
    &:hover {
      color: ${shade(0.2, '#3b9fff')};
    }

    svg {
      margin-right: 5px;
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
`

export const AnimationContainer = styled.div`
  animation: ${appearFromLeft} 1s;
`;
