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
          Rentabilidade anual:
          <b>X.XX%</b>
        </div>
        <div id="line">
          Preço unitário:
          <b>R$X.XX%</b>
        </div>
        <div id="line">
          Vencimento:
          <b>XX/XX/XX</b>
        </div>
      </div>
    </CardBody>
    <hr/>
    <CardFooter>
      <div id="card-notify">
        <p>Notifique-me quando o rendimento for</p>
        [MAIOR/MENOR] que <input type="number" placeholder="XX.XX"/>%
        <button>Criar notificação</button>
      </div>
    </CardFooter>
    </Container>
  </>
)

export default Card;
