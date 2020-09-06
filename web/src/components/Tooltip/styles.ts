import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;

    background: #1d498b;
    color: #fff;
    padding: 8px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500px;
    opacity: 0;
    /* transition: opacity 0.2s; */
    transition: visibility 0.2s linear, opacity 0.2s linear;
    position: absolute;
    bottom: calc(100% + 5px);
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 2px;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
    visibility: hidden;

    &::before {
      content: '';
      border-style: solid;
      border-color: #1d498b transparent;
      border-width: 6px 6px 0px 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &:hover span {
    opacity: 1;
    visibility: visible;
  }

`;
