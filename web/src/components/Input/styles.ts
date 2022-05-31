import styled, { css } from 'styled-components';
// import { shade } from 'polished';
import Tooltip from '../Tooltip';

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

  ${props =>
    props.isErrored &&
    css`
      border-color: #e63232;
      color: red;
      svg {
        color: #e63232;
      }
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #1d498b;
      font-weight: bold;
      border: 2px solid #1d498b;
      svg {
        color: #1d498b;
      }
    `}

  ${props =>
    props.isFilled &&
    css`
      svg {
        color: #1d498b;
      }
    `}

  input {
    flex: 1;
    border: 0;
    background: transparent;

    &::placeholder {
      color: #666360;
    }
  }
`;

export const Error = styled(Tooltip)`
  max-height: 20px;
  margin-left: 16px;

  svg {
    margin: 0px;
  }

  span {
    background: #e63232;

    &::before {
      border-color: #e63232 transparent;
    }
  }
`;
