import React from 'react';
import { Container, CardHeader, CardBody, CardFooter } from './styles';
import { FiInfo } from "react-icons/fi";

const Card: React.FC = () => (
  <>
    <Container>
      <CardHeader>
        <h2>Tesouro IPCA+ 2026</h2>
        <FiInfo size={24}/>
      </CardHeader>
        <hr/>
      <CardBody>
        <div id="bond-info">
          <div id="line">
            <label>Rentabilidade anual:</label>
            <b>X.XX%</b>
          </div>
          <div id="line">
            <label>Preço unitário:</label>
            <b>R$X.XX%</b>
          </div>
          <div id="line">
            <label>Vencimento:</label>
            <b>XX/XX/XX</b>
          </div>
        </div>
      </CardBody>
      <hr/>
      <CardFooter>
        <div id="card-notify">
          <p>Notifique-me quando o rendimento for</p>
          <label>[MAIOR/MENOR] que <input type="number" placeholder="XX.XX"/>%</label>
          <button>Criar notificação</button>
        </div>
      </CardFooter>
    </Container>
  </>
)

export default Card;