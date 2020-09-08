import styled from 'styled-components';

export const Container = styled.div`
  left: 0;
  bottom: 0;
  right: 0;
  position: fixed;

  background: #8b491d;
  color: #ffffff;
  height: 50px;
  font-size: 16px;

  a {
    font-weight: bold;
    color: #5cb1ff;
    &#privacy {
      font-size: 12px;
      color: #ffffff;
      text-decoration: none;
    }
  }
`;

export const FooterBody = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 25px;
  margin-right: 25px;
  p {
    margin-top: 15px;
  }
`;
