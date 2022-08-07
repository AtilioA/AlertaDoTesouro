import { useState } from 'react';
import { FiInfo } from 'react-icons/fi';
import axiosInstance from '../../config/axios';
import { NotificationType } from '../../@types/backend.d';
import type { TreasuryBond } from '../../@types/backend';
import { Container, CardHeader, CardBody, CardFooter } from './styles';

interface CardControls {
  loading: boolean;
  error:
    | false
    | {
        message: string;
      };
}

// TODO(dashboard) ...
export default function Card({
  id,
  name,
  annualInvestmentRate,
  investmentUnitaryValue,
  expirationDate,
}: TreasuryBond) {
  const [cardControls, setCardControls] = useState<CardControls>({
    error: false,
    loading: true,
  });
  function updateCardControls(fields: Partial<CardControls>) {
    setCardControls(prev => ({
      ...prev,
      ...fields,
    }));
  }
  const [rendimento, setRendimento] = useState<number>(0);
  const [notificationType, setNotificationType] = useState<NotificationType>(
    NotificationType.GREATER,
  );

  async function handleAddNotification() {
    setCardControls({ loading: true, error: false });
    try {
      const res = await axiosInstance.post('/notifications', {
        treasurybond_id: id,
        value: 1.2,
        type: 'maior',
        notifyByEmail: true,
        notifyByBrowser: true,
        active: true,
      });
      return res;
    } catch (err) {
      updateCardControls({
        error: { message: 'Error setting notification' },
      });
    } finally {
      updateCardControls({ loading: false });
    }
  }

  return (
    <Container>
      <CardHeader>
        <h2>{name}</h2>
        <div>
          <FiInfo size={24} />
        </div>
      </CardHeader>
      <hr />
      <CardBody>
        <div id="bond-info">
          <div id="line">
            <label>Rentabilidade anual:</label>
            <b>{annualInvestmentRate}%</b>
          </div>
          <div id="line">
            <label>Preço unitário:</label>
            <b>R${investmentUnitaryValue}</b>
          </div>
          <div id="line">
            <label>Vencimento:</label>
            <b>
              {new Date(expirationDate).toLocaleString('pt-BR').split(' ')[0]}
            </b>
          </div>
        </div>
      </CardBody>
      <hr />
      <CardFooter>
        <div id="card-notify">
          <p>Notifique-me quando o rendimento for</p>
          <label>
            {/* a radio selectio with option 'MAIOR' and 'MENOR' */}
            <input
              defaultChecked
              type="radio"
              id="notification-type"
              name="notification-type"
              value={NotificationType.GREATER}
            />
            {NotificationType.GREATER}
            <input
              type="radio"
              id="notification-type"
              name="notification-type"
              value={NotificationType.LESS}
            />
            {NotificationType.LESS} que
            <input
              id="notification-value"
              type="number"
              placeholder={rendimento.toFixed(3)}
              value={rendimento.toFixed(3)}
              onChange={e => {
                const num = parseFloat(e.target.value);
                if (!Number.isNaN(num)) {
                  setRendimento(num);
                }
              }}
            />
            %
          </label>
          {/* TODO trocar a corzinha do verde quando der pau */}
          <button type="button" onClick={() => handleAddNotification()}>
            {!cardControls.loading && cardControls.error
              ? cardControls.error.message
              : 'Criar notificação'}
          </button>
        </div>
      </CardFooter>
    </Container>
  );
}
