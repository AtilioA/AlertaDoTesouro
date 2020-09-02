import styled from 'styled-components';

export const Container = styled.div`
  background: #1D498B;
  padding: 0 30px;
  border-radius: 0 0 15px 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
    color: #FFFFFF;
    font-size: 36px;
    font-family: 'Quattrocento', serif;
    font-weight: 500;
    line-height: 28px;
    /* img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    } */

    a {
      text-decoration: none;
      color: #fff;
    }
  }

  aside {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #fff;
    font-family: "Lato", sans-serif;
    justify-content: space-around;
    font-size: 16px;

    a {
      margin-right: 15px;
      color: #eee;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    button {
      font-size: 16px;
      color: #fff;
      font-weight: bold;

      background: none;
      border: 1px solid #fff;
      padding: 10px 20px 10px 20px;
      border-radius: 50px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  /* align-items: stretch; */
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }

  /* img {
    height: 32px;
    width: 32px;
    border-radius: 50%;
  } */
`;
