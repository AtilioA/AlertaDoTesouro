import Toggle from 'react-toggle';

import { FiEdit, FiTrash } from 'react-icons/fi';
import {
  Container,
  AnimationContainer,
  Notification,
  NotificationsContainer,
  NotificationContainer,
} from './styles';
// import Input from '../../components/Input';

export default function Notifications() {
  function handleNotifyChange() {
    return true;
  }

  return (
    <AnimationContainer>
      <Container>
        <div id="header">
          <h1>CONFIGURAÇÕES GLOBAIS</h1>
        </div>

        <div id="global-notification-settings">
          <div id="toggle-with-label">
            <span>Receber notificações</span>
            <Toggle
              id="notification-status"
              defaultChecked
              onChange={() => handleNotifyChange()}
            />
          </div>
          <div id="global-notification-settings-body">
            <div id="toggle-with-label">
              <span>Receber notificações por e-mail</span>
              <Toggle
                id="notification-status"
                defaultChecked
                onChange={() => handleNotifyChange()}
              />
            </div>
            <div id="toggle-with-label">
              <span>Receber notificações pelo navegador</span>
              <Toggle
                id="notification-status"
                defaultChecked
                onChange={() => handleNotifyChange()}
              />
            </div>
          </div>
        </div>
      </Container>
      <NotificationsContainer>
        <div id="header">
          <h1>NOTIFICAÇÕES</h1>
        </div>
        <NotificationContainer>
          <Notification>
            <div id="notification-content">
              <div id="notification-bond">
                <h1>Tesouro IPCA 2026+</h1>
                <div id="notification-bond-value">
                  <span>Taxa atual:</span>
                  <b>XX.XX%</b>
                </div>
                <div id="notification-bond-value">
                  <span>Preço unitário:</span>
                  <b>R$XX.XX</b>
                </div>
              </div>
              <div id="notification-summary">
                <span>
                  Você será notificado quando a taxa estiver <u>maior</u> que{' '}
                  <b>XX.XX%</b>.
                </span>
                <span>Notificação criada em XX/XX/XXXX.</span>
              </div>
              <div id="notification-actions">
                <div id="toggle-with-label">
                  <h1>Ativa</h1>
                  <Toggle
                    id="notification-status"
                    defaultChecked
                    onChange={() => handleNotifyChange()}
                  />
                </div>
                <div id="notification-actions-active-minor">
                  <div id="toggle-with-label">
                    <span>E-mail</span>
                    <Toggle
                      id="notification-status"
                      defaultChecked
                      onChange={() => handleNotifyChange()}
                    />
                  </div>
                  <div id="toggle-with-label">
                    <span>Browser</span>
                    <Toggle
                      id="notification-status"
                      defaultChecked
                      onChange={() => handleNotifyChange()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Notification>
          <div id="notification-actions-edit-delete">
            <div id="edit">
              <button type="button">
                <FiEdit />
              </button>
            </div>
            <div id="delete">
              <button type="button">
                <FiTrash />
              </button>
            </div>
          </div>
        </NotificationContainer>
      </NotificationsContainer>
    </AnimationContainer>
  );
}
