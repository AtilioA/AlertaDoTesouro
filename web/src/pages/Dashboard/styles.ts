import styled from 'styled-components';
import { shade } from 'polished';
import Card from '../../components/Card';

export const Container = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;

  div#app-status {
    margin-top: 50px;

    div#market-status {
      display: flex;
      flex-direction: row;

      justify-content: center;
      align-items: center;

      svg {
        color: green; /* 3b9 */
        margin-top: 1px;
        margin-right: 10px;
      }
    }

    div#market-operating-hours {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      svg {
        margin-right: 5px;
      }
    }

    div#market-last-update {
      margin-top: 25px;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      svg {
        margin-right: 10px;
        margin-top: 5px;
      }

      button {
        border: 0;
      }
    }
  }
`;

export const BondsList = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  div#bonds-list {
    margin-top: 30px;
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div#card-list {
      margin-top: 20px;
      display: flex;
      flex-direction: row;
    }


    div#IPCA {
      border-radius: 15px 15px 0px 0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 30px 30px 60px 60px;


      background: #FF6712;
    }

    div#fixed-rate {
      justify-content: center;
      align-items: center;
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 30px 30px 60px 60px;


      background: #00D2AD;
    }

    div#postfixed {
      border-radius: 0px 0px 15px 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 30px 30px 60px 60px;

      background: #9557FF;
    }
  }
`;
