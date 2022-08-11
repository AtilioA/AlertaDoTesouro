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
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [user, setUser] = useState<UserType>(
    JSON.parse(localStorage.getItem('@AlertaDoTesouro:user') ?? '') as UserType,
  );

  useEffect(() => {
    console.log(user.notify, user.notifyByEmail, user.notifyByBrowser);
    api
      .put(`/users/`, {
        notify: user.notify,
        notifyByEmail: user.notifyByEmail,
        notifyByBrowser: user.notifyByBrowser,
      })
      .then(() => {
        localStorage.setItem('@AlertaDoTesouro:user', JSON.stringify(user));
        console.log('Notification status updated!');
      })
      .catch(error => {
        console.error(error);
      });
  }, [user, user.notify, user.notifyByEmail, user.notifyByBrowser]);

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
              // defaultChecked={user.notify}
              checked={user.notify}
              onChange={() => {
                // Has to be set inside here because the function is execute in the context before state reaction
                const futureNotify = !user.notify;
                setUser(prev => ({ ...prev, notify: futureNotify }));
                if (!futureNotify) {
                  setUser(prev => ({
                    ...prev,
                    notify: false,
                    notifyByBrowser: false,
                    notifyByEmail: false,
                  }));
                }
              }}
            />
          </div>
          <div id="global-notification-settings-body">
            <div id="toggle-with-label">
              <span>Receber notificações por e-mail</span>
              <Toggle
                id="notification-status-global-email"
                defaultChecked={user.notifyByEmail}
                checked={user.notifyByEmail}
                onChange={() => {
                  // Has to be set inside here because the function is execute in the context before state reaction
                  const futureNotify = !user.notifyByEmail;
                  setUser(prev => ({ ...prev, notifyByEmail: futureNotify }));
                  if (futureNotify) {
                    setUser(prev => ({
                      ...prev,
                      notify: true,
                      notifyByEmail: true,
                    }));
                  }
                }}
              />
            </div>
            <div id="toggle-with-label">
              <span>Receber notificações pelo navegador</span>
              <Toggle
                id="notification-status-global-browser"
                defaultChecked={user.notifyByBrowser}
                checked={user.notifyByBrowser}
                onChange={() => {
                  // Has to be set inside here because the function is execute in the context before state reaction
                  const futureNotify = !user.notifyByBrowser;
                  setUser(prev => ({ ...prev, notifyByBrowser: futureNotify }));
                  if (futureNotify) {
                    setUser(prev => ({
                      ...prev,
                      notify: true,
                      notifyByBrowser: true,
                    }));
                  }
                }}
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
