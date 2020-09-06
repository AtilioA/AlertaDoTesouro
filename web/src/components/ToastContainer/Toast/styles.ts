import styled, { css } from "styled-components";

const toastTypeVariations = {
  info: css`
  background: #ebf8ff;
  color: #3172b7;
`,
success: css`
  background: #ebfff5;
  color: #31b774;
`,
error: css`
  background: #ffebeb;
  color: #b73131;
  `,
}

interface ContainerProps {
  type?: 'success' | 'error' | 'info';
  hasDescription?: boolean;
}
export const Container = styled.div<ContainerProps>`
  display: flex;

  width: 360px;

  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  & + div {
    margin-top: 8px;
  }

  ${(props) => toastTypeVariations[props.type || 'info']}

  > svg {
    margin: 0px 12px 0px 0px;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 19px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${props => !props.hasDescription && css `
  align-items: center;
  svg {
    margin-top: 0px;
  }
  `}
`;
