import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;

  align-items: center;
  background: #555;
  border-radius: 4px;

  margin-top: 5px;
  padding: 10px;
  width: 100%;
  background: #e2e2e2;
  border: 2px solid #e2e2e2;

  svg {
    vertical-align: top;
    margin: 2px;
    color: #666360;
    margin-right: 10px;
  }

  ${(props) =>
    props.isFocused &&
    css`
      color: #1d498b;
      font-weight: bold;
      border: 2px solid #1d498b;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      svg {
        color: #1d498b;
      }
    `}

    ${(props) =>
    props.isErrored &&
    css`
      border-color: #e63232;
      color: red;
    `}

  input {
    flex: 1;
    border: 0;
    background: transparent;

    &::placeholder {
      color: #666360;
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
    }
  }
`;
