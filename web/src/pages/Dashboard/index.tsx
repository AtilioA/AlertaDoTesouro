import React, { useCallback } from 'react';

import { FiCheckCircle, FiClock, FiRefreshCw } from 'react-icons/fi';
import { Container, BondsList } from './styles';
import Card from '../../components/Card';

const Dashboard: React.FC = () => {
  const getTreasuryBondTitles = useCallback(async () => {}, []);

  return (
    <>
      <Container>
        <div id="app-status">
          <div id="market-status">
            <FiCheckCircle size={24} />
            <h1>Mercado aberto</h1>
          </div>

          <div id="market-operating-hours">
            <FiClock size={16} color={'gray'} />
            Horário de funcionamento: de 9h30 às 18h.
          </div>

          <div id="market-last-update">
            <button>
              <FiRefreshCw size={24} />
            </button>
            <h1>Atualizado às XX/XX/XXXX, XX:XX.</h1>
          </div>
        </div>
      </Container>
      <BondsList>
        <div id="bonds-list">
          <div id="IPCA">
            <h1>Títulos indexados ao IPCA</h1>
            <div id="card-list">
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </div>
          <div id="fixed-rate">
            <h1>Títulos pré-fixados</h1>
            <div id="card-list">
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </div>
          <div id="postfixed">
            <h1>Títulos pós-fixados</h1>
            <div id="card-list">
              <Card />
            </div>
          </div>
        </div>
      </BondsList>
    </>
  );
};

export default Dashboard;
