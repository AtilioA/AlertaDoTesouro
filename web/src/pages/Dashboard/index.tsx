import { useEffect, useState } from 'react';
import { FiCheckCircle, FiClock, FiRefreshCw } from 'react-icons/fi';
import axios from 'axios';
import type { AxiosError } from 'axios';
import type { TreasuryBond } from '../../@types/backend';
import { Container, BondList } from './styles';
import Card from '../../components/Card';
import axiosInstance from '../../config/axios';

export default function Dashboard() {
  const [pageControls, setPageControls] = useState<{
    loading: boolean;
    error: { message: string } | false;
  }>({ loading: false, error: false });
  function setLoading(loading: boolean) {
    setPageControls(prev => ({
      ...prev,
      loading,
    }));
  }
  function setError(error: AxiosError | Error) {
    setPageControls(prev => ({
      ...prev,
      error,
    }));
  }

  const [bonds, setBonds] = useState<TreasuryBond[]>();
  // console.log('BONDS', bonds);

  async function fetchlyTreasury() {
    if (pageControls.loading) return;
    try {
      setLoading(true);
      const { data: response } = await axiosInstance.get<TreasuryBond[]>(
        `/treasurybond`,
      );
      console.log(response);
      setBonds(response);
    } catch (err) {
      if (axios.isAxiosError(err) || err instanceof Error) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchlyTreasury().catch(() => {});
  }, []);

  if (pageControls.loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container>
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
              {bonds?.map(bond => (
                <Card key={bond.id} {...bond} />
              ))}
            </div>
          </div>
          <div id="fixed-rate">
            <h1>Títulos pré-fixados</h1>
            <div id="card-list">AAA</div>
          </div>
          <div id="postfixed">
            <h1>Títulos pós-fixados</h1>
            <div id="card-list">BBBB</div>
          </div>
        </div>
      </BondList>
    </>
  );
}
