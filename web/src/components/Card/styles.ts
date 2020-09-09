import styled from 'styled-components';
import { shade } from 'polished';

export const CardFooter = styled.div`
  display: flex;
  height: 300px;

  p, label {
    font-size: 16px;
    line-height: 50px;
    margin-left: 21px;
    margin-top: 10px;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  input {
    border-bottom: 1px solid #000;
    border: 0;

    padding: 8px;
    width: 60px;
    background: none;
    margin: 0px 0px 0px 10px;
  }

  div#card-notify {
    height: 300px;
  }

  button {
    height: 70px;
    width: 100%;

    font-size: 24px;
    font-weight: bold;

    color: #25282B;
    background: #10E17D;

    border: 0;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
    border-radius: 0px 0px 40px 40px;

    transition: background 0.2s;
    &:hover {
      background: ${shade(-0.1, '#10E17D')};
    }
  }
`;

export const CardBody = styled.div`
  display: flex;
  margin-top: 20px;
  margin-left: 21px;
  height: 150px;

  div#bond-info {
    font-size: 20px;
    display: flex;
    flex-direction: column;
  }
  div#line {
    display: flex;
    justify-content: space-between;
    b {
        font-size: 24px;
        margin-left: 45px;
      }
    & + div#line {
      margin-top: 20px;
    }
  }
`;

export const CardHeader = styled.div`
  border-left: 12px solid #1D498B;
  background: #eee; /* #eee */
  padding: 0 30px;
  border-radius: 0 40px 0px 0px;

  height: 100px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 30px;
    text-align: left;
    margin-left: -20px;
    margin-right: 30px;
  }

  svg {
    color: #888;
  }
`;

export const Container = styled.div`
  background: #eee;
  border-radius: 0 40px 40px 40px;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.25);

  height: 500px;
  max-width: 350px;
  margin: 0 auto;
  margin-left: 35px;
  margin-right: 35px;

  hr {
    border: 0px;
    margin-top: 5px;
    margin-bottom: 5px;
    height: 1px;
    border: 0;
    background: #000;
    opacity: 0.1
  }

  a {
    margin-right: 15px;
    color: #eee;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
