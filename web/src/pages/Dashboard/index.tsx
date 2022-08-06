import { FiCheckCircle, FiClock, FiRefreshCw } from 'react-icons/fi';
import { Container, BondList } from './styles';
import Card from '../../components/Card';

export default function Dashboard() {
  // const getTreasuryBondTitles = useCallback(async () => {}, []);

  return (
    <>
      <Container>
        {/* TODO(dashboard) change this according to market status */}
        <div id="app-status">
          <div id="market-status">
            <FiCheckCircle size={24} />
            <h1>Mercado aberto</h1>
          </div>

          <div id="market-operating-hours">
            <FiClock size={16} color="gray" />
            Horário de funcionamento: de 9h30 às 18h
          </div>

          <div id="market-last-update">
            <button type="button">
              <FiRefreshCw size={24} />
            </button>
            {/* TODO(dashboard) botar data de resposta da API */}
            <h1>Atualizado às XX/XX/XXXX, XX:XX.</h1>
          </div>
        </div>
      </Container>
      <BondList>
        <div id="bond-list">
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
      </BondList>
    </>
  );
}
