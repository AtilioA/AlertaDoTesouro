import styled, { keyframes } from 'styled-components';
import { saturate, shade } from 'polished';

import '../../components/Toggle/styles.css';

export const Container = styled.div`
  display: flex;

  margin-top: 30px;
  align-items: center;
  flex-direction: column;

  div#header {
    h1 {
      margin-bottom: 10px;
    }
  }

  div#toggle-with-label {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  div#global-notification-settings {
    align-items: center;

    span {
      font-size: 24px;
      margin: 2px 10px 2px 10px;
    }

    display: flex;
    justify-content: center;
    padding: 10px;
    flex-direction: column;
    font-size: 20px;
    text-align: left;
    background: #e2e2e2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
  }

  div#global-notification-settings-body {
    span {
      font-size: 20px;
    }

    div#toggle-with-label {
      margin-top: 4px;
    }

    justify-content: space-around;
    margin-top: 30px;
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
  }
`;

export const NotificationsContainer = styled.div`
  display: flex;
  justify-items: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  div#header {
    h1 {
      margin-bottom: 20px;
    }
  }
`;

export const NotificationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* flex-wrap: wrap; */
  max-width: 90%;
  flex: 1;

  & + div {
    margin-top: 20px;
  }
  div#notification-content {
    display: flex;
    flex-direction: row;
  }

  div#notification-actions-edit-delete {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
    border-radius: 0px 15px 15px 0px;
    display: flex;
    flex-direction: row;
  }

  div#delete {
    button {
      border-radius: 0px 15px 15px 0px;
      padding: 25px;
      width: 100%;
      flex: 1;
      height: 148px;
      background: ${saturate(-0.5, '#ff1818')};
      border: 0;

      transition: background 0.2s;
      &:hover {
        background: ${saturate(-0.1, '#ff1818')};
      }
    }
  }
`;

export const Notification = styled.div`
  /* max-width: 80%; */
  justify-content: center;
  align-items: center;
  background: #e2e2e2;
  border-radius: 2px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 20px 0px 20px 0px;
  flex-direction: row;

  div#notification-content {
    padding: 0px 20px 0px 20px;
    display: flex;
    flex-direction: row;
  }

  div#notification-bond {
    border-right: 1px solid #828282;
    width: 75%;
    padding-right: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      font-size: 20px;
      margin-bottom: 10px;
    }

    div#notification-bond-value {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      span {
        font-weight: normal;
        font-size: 16px;
      }
    }
  }

  div#notification-summary {
    padding-left: 25px;
    padding-right: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      & + span {
        margin-top: 10px;
      }
    }
  }

  div#toggle-with-label {
    span {
      margin-right: 10px;
    }

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
  }

  div#notification-actions-active-minor {
    margin-top: 20px;

    span {
      margin-top: 5px;
      & + div {
        margin-top: 8px;
      }
    }
  }

  div#notification-actions {
    padding-left: 20px;
    border-left: 1px solid #828282;

    h1 {
      font-size: 20px;
    }

    display: flex;
    flex-direction: column;
  }

  div#notification-actions-edit-delete {
    display: flex;
    flex-direction: column;
    border-radius: 0px 2px 0px 2px;
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
`;

export const AnimationContainer = styled.div`
  animation: ${appearFromLeft} 1s;
`;
