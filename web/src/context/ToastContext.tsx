import { createContext, ReactNode, useCallback, useState } from 'react';
import { useTransition } from 'react-spring';
import * as uuid from 'uuid';

import styled from 'styled-components';
import Toast from '../components/Toast';

export interface BaseLayoutProps {
  children: ReactNode;
}

export interface ToastMessage {
  key: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'key'>): void;
  removeToast(id: string): void;
}

export const ToastContext = createContext<ToastContextData>(
  {} as ToastContextData,
);

const Container = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 30px;
  overflow: hidden;
`;

function ToastContainer({ messages }: { messages: ToastMessage[] }) {
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
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
}
