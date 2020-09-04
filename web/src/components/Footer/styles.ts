import styled from "styled-components";

export const Container = styled.div`
  background: #8B491D;
  color: #FFFFFF;
  height: 50px;
  font-size: 16px;

  a {
    font-weight: bold;
    color: #5cb1ff;
    &#privacy {
      font-size: 12px;
      color: #FFFFFF;
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
