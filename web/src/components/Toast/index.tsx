import {
  useContext,
  useEffect,
  createContext,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import { useTransition } from 'react-spring';
import * as uuid from 'uuid';
import {
  FiAlertTriangle,
  FiXCircle,
  FiCheckCircle,
  FiAlertCircle,
} from 'react-icons/fi';
import ToastDiv, { Container } from './styles';

export interface ToastMessage {
  key: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

export interface ToastProps {
  toastProps: ToastMessage;
  style: object;
}

const icons = {
  info: <FiAlertCircle size={20} />,
  success: <FiCheckCircle size={20} />,
  error: <FiAlertTriangle size={20} />,
};

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'key'>): void;
  removeToast(id: string): void;
}

export const ToastContext = createContext<ToastContextData>(
  {} as ToastContextData,
);

export default function Toast({ toastProps, style }: ToastProps) {
  const { removeToast } = useContext(ToastContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toastProps.key);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, toastProps.key]);

  return (
    <ToastDiv
      style={style}
      type={toastProps.type}
      hasDescription={!!toastProps.description}
    >
      {icons[toastProps.type || 'info']}
      <div>
        <strong>{toastProps.title}</strong>
        {toastProps.description && <p>{toastProps.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(toastProps.key)}>
        <FiXCircle size={20} />
      </button>
    </ToastDiv>
  );
}

export interface BaseLayoutProps {
  children: ReactNode;
}

export function ToastsAnimated({ messages }: { messages: ToastMessage[] }) {
  const messagesWithTransition = useTransition(messages, {
    keys: item => item.key,
    from: { right: '-110%', opacity: '0' },
    enter: { right: '0', opacity: 1 },
    leave: { right: '-110%', opacity: 0 },
  });

  return (
    <Container>
      {messagesWithTransition((style, { key, title, description, type }) => (
        <Toast
          key={key}
          style={style}
          toastProps={{ key, title, description, type }}
        />
      ))}
    </Container>
  );
}

export function ToastProvider({ children }: BaseLayoutProps) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'key'>) => {
      const key = uuid.v4();

      const toast = {
        key,
        type,
        title,
        description,
      };

      setMessages(oldMessages => [...oldMessages, toast]);
    },
    [],
  );

  const removeToast = useCallback((key: string) => {
    setMessages(state => state.filter(message => message.key !== key));
  }, []);

  return (
    // FIXME
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastsAnimated messages={messages} />
    </ToastContext.Provider>
  );
}
