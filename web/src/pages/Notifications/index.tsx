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
import api from '../../config/axios';
import NotificationType from '../../@types/Notification';
import UserType from '../../@types/User';

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [user, setUser] = useState<UserType>(
    JSON.parse(localStorage.getItem('@AlertaDoTesouro:user') ?? '') as UserType,
  );
  const [notify, setNotify] = useState(user.notify);
  const [notifyByEmail, setNotifyByEmail] = useState(user.notifyByEmail);
  const [notifyByBrowser, setNotifyByBrowser] = useState(user.notifyByBrowser);

  useEffect(() => {
    api
      .put(`/users/`, {
        notify,
        notifyByEmail,
        notifyByBrowser,
      })
      .then(() => {
        localStorage.setItem('@AlertaDoTesouro:user', JSON.stringify(user));
        console.log('Notification status updated!');
      })
      .catch(error => {
        console.error(error);
      });
  }, [user, notify, notifyByEmail, notifyByBrowser]);

  useEffect(() => {
    api
      .get(`/users/`)
      .then(userResponse => {
        const userData = userResponse.data as UserType;
        setUser(userData);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    api
      .get('/notifications')
      .then(notificationsResponse => {
        const responseData = notificationsResponse.data as NotificationType[];

        setNotifications(responseData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  async function handleNotificationDelete(notificationID: string) {
    // Fools the user and might not be needed if the notifications are getting deleted from the backend
    const newNotifications = notifications.filter(
      mapNotification => mapNotification.id !== notificationID,
    );
    setNotifications([...newNotifications]);

    // DELETE request + bearer token to notification endpoint with notification ID
    try {
      await api.delete(`/notifications/${notificationID}`);
      console.log('Notification deleted');
    } catch (error) {
      console.error(error);
    }
  }

  console.log('USER', user);

  function formatDate(date: string) {
    const dateObject = new Date(date);
    const dateFormatted = `${dateObject.getDate()}/${
      dateObject.getMonth() + 1
    }/${dateObject.getFullYear()}`;

    return dateFormatted;
  }

  function handleGlobalNotifyChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.id);
    switch (e.target.id) {
      case 'notification-status-global-all':
        setNotify(e.target.checked);
        if (!e.target.checked) {
          setNotifyByEmail(false);
          setNotifyByBrowser(false);
        }
        break;
      case 'notification-status-global-email':
        setNotifyByEmail(e.target.checked);
        if (e.target.checked) {
          setNotify(true);
        }
        break;
      case 'notification-status-global-browser':
        setNotifyByBrowser(e.target.checked);
        if (e.target.checked) {
          setNotify(true);
        }
        break;
      default:
        console.error("Switch didn't work 😯");
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
            <Toggle
              id="notification-status-global-all"
              defaultChecked={user?.notify}
              checked={notify}
              onChange={e => handleGlobalNotifyChange(e)}
            />
          </div>
          <div id="global-notification-settings-body">
            <div id="toggle-with-label">
              <span>Receber notificações por e-mail</span>
              <Toggle
                id="notification-status-global-email"
                defaultChecked={user?.notifyByEmail}
                checked={notifyByEmail}
                onChange={e => handleGlobalNotifyChange(e)}
              />
            </div>
            <div id="toggle-with-label">
              <span>Receber notificações pelo navegador</span>
              <Toggle
                id="notification-status-global-browser"
                defaultChecked={user?.notifyByBrowser}
                checked={notifyByBrowser}
                onChange={e => handleGlobalNotifyChange(e)}
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
