import { useEffect, useState } from 'react';
import { FiCheckCircle, FiClock, FiRefreshCw } from 'react-icons/fi';
import axios from 'axios';
import type { AxiosError } from 'axios';
import { Container, BondList } from './styles';
import Card from '../../components/Card';
import axiosInstance from '../../config/axios';
import { TreasuryBond } from '../../@types/global';

/// Codes for each known index type
const KnownIndexes = {
  // IGPN: 1,
  SELIC: 17,
  PREFIXADO: 19,
  IPCA: 22,
};

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

  const [bonds, setBonds] =
    useState<Record<keyof typeof KnownIndexes, TreasuryBond[]>>();

  function filterBonds(t: TreasuryBond[], code: number): TreasuryBond[] {
    return t.filter(
      b =>
        (b.lastDateOfNegotiation === null ||
          b.lastDateOfNegotiation === undefined) &&
        b.indexedTo?.code === code,
    );
  }

  async function fetchlyTreasury() {
    if (pageControls.loading) return;
    try {
      setLoading(true);
      const { data: response } = await axiosInstance.get<TreasuryBond[]>(
        `/treasurybond`,
      );

      const bondsMap = Object.keys(KnownIndexes)
        .map(key => ({
          [key]: filterBonds(
            response,
            KnownIndexes[key as keyof typeof KnownIndexes],
          ),
        }))
        .reduce((acc, cur) => ({ ...acc, ...cur }), {}) as Record<
        keyof typeof KnownIndexes,
        TreasuryBond[]
      >;
      setBonds(bondsMap);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              {bonds?.IPCA.map(bond => (
                <Card key={bond.id} {...bond} />
              ))}
            </div>
          </div>
          <div id="fixed-rate">
            <h1>Títulos pré-fixados</h1>
            <div id="card-list">
              {bonds?.PREFIXADO.map(bond => (
                <Card key={bond.id} {...bond} />
              ))}
            </div>
          </div>
          <div id="postfixed">
            <h1>Títulos SELIC</h1>
            <div id="card-list">
              {bonds?.SELIC.map(bond => (
                <Card key={bond.id} {...bond} />
              ))}
            </div>
          </div>
        </div>
      </BondList>
    </>
  );
}
