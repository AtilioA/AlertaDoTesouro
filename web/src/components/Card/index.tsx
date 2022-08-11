import { useState } from 'react';
import { FiInfo } from 'react-icons/fi';
import { NotificationType, TreasuryBond } from '../../@types/global';
import axiosInstance from '../../config/axios';
import { Container, CardHeader, CardBody, CardFooter } from './styles';

interface CardControls {
  loading: boolean;
  error?: {
    message: string;
  };
}

export default function Card({
  id,
  name,
  annualInvestmentRate,
  investmentUnitaryValue,
  expirationDate,
}: TreasuryBond) {
  const [cardControls, setCardControls] = useState<CardControls>({
    error: undefined,
    loading: true,
  });
  function updateCardControls(fields: Partial<CardControls>) {
    setCardControls(prev => ({
      ...prev,
      ...fields,
    }));
  }
  const [trigger, setTrigger] = useState<number>(0);
  const [notificationType, setNotificationType] =
    useState<NotificationType>('maior');

  async function handleAddNotification() {
    setCardControls({ loading: true, error: undefined });
    try {
      const res = await axiosInstance.post('/notifications', {
        bond: { id },
        value: trigger,
        type: notificationType,
        active: true,
        notifyByEmail: true,
        notifyByBrowser: true,
      });
      return res;
    } catch (err) {
      updateCardControls({
        error: {
          message: 'Erro configurando a notificação. Você está logado?',
        },
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
            <input
              defaultChecked
              type="radio"
              id="notification-type"
              name="notification-type"
              onSelect={() => setNotificationType('maior')}
              value="maior"
            />
            maior
            <input
              type="radio"
              id="notification-type"
              name="notification-type"
              onSelect={() => setNotificationType('menor')}
              value="menor"
            />
            menor que
            <input
              id="notification-value"
              type="number"
              placeholder={trigger.toFixed(3)}
              value={trigger.toFixed(3)}
              onChange={e => {
                const num = parseFloat(e.target.value);
                if (!Number.isNaN(num)) {
                  setTrigger(num);
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
