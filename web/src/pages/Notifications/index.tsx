/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import Toggle from 'react-toggle';

import { FiTrash } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import {
  Container,
  AnimationContainer,
  Notification,
  NotificationsContainer,
  NotificationContainer,
} from './styles';
import api from '../../services/api';
import NotificationType from '../../@types/Notification';

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  useEffect(() => {
    // GET request + bearer token to notification list endpoint
    const userToken = localStorage.getItem('@AlertaDoTesouro:token');
    if (userToken) {
      api
        .get('/notifications', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then(notificationsResponse => {
          const responseData = notificationsResponse.data as NotificationType[];

          setNotifications(responseData);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);

  // NOTE: Depois usar essa bomba para listagem: https://contactmentor.com/render-array-map-react-js/

  function handleNotificationDelete(notificationID: string) {
    // Fools the user and might not be needed if the notifications are getting deleted from the backend
    const newNotifications = notifications.filter(
      mapNotification => mapNotification.id !== notificationID,
    );
    setNotifications([...newNotifications]);

    // DELETE request + bearer token to notification endpoint with notification ID
    const userToken = localStorage.getItem('@AlertaDoTesouro:token');
    if (userToken) {
      api
        .delete(`/notifications/${notificationID}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then(() => {
          console.log('Notification deleted');
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  function formatDate(date: string) {
    const dateObject = new Date(date);
    const dateFormatted = `${dateObject.getDate()}/${dateObject.getMonth() + 1
      }/${dateObject.getFullYear()}`;

    return dateFormatted;
  }
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
            <Toggle id="notification-status" defaultChecked />
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

        {notifications.map(notification => (
          <NotificationContainer key={notification.id}>
            <Notification>
              <div id="notification-content">
                <div id="notification-bond">
                  <h1>{notification.bond.name}</h1>
                  <div id="notification-bond-value">
                    <span>Taxa atual:</span>
                    <b>{notification.bond.annualInvestmentRate}%</b>
                  </div>
                  <div id="notification-bond-value">
                    <span>Preço unitário:</span>
                    <b>R${notification.bond.minimumInvestmentAmount}</b>
                  </div>
                </div>
                <div id="notification-summary">
                  <span>
                    Você será notificado quando a taxa estiver{' '}
                    <u>{notification.type}</u> que <b>{notification.value}%</b>.
                  </span>
                  <span>
                    Notificação criada em {formatDate(notification.created_at)}.
                  </span>
                </div>
                <div id="notification-actions">
                  <div id="toggle-with-label">
                    <h1>Ativa</h1>
                    <Toggle
                      id="notification-status"
                      value={String(notification.active)}
                      onChange={() => handleNotifyChange()}
                    />
                  </div>
                  <div id="notification-actions-active-minor">
                    <div id="toggle-with-label">
                      <span>E-mail</span>
                      <Toggle
                        id="notification-status"
                        value={String(notification.notifyByEmail)}
                        onChange={() => handleNotifyChange()}
                      />
                    </div>
                    <div id="toggle-with-label">
                      <span>Browser</span>
                      <Toggle
                        id="notification-status"
                        value={String(notification.notifyByBrowser)}
                        onChange={() => handleNotifyChange()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Notification>
            <div id="notification-actions-edit-delete">
              <div id="delete">
                <button
                  type="button"
                  onClick={() => handleNotificationDelete(notification.id)}
                >
                  <FiTrash />
                </button>
              </div>
            </div>
          </NotificationContainer>
        ))}
      </NotificationsContainer>
    </AnimationContainer>
  );
}
