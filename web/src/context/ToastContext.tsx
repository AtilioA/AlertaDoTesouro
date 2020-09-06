import React, { createContext, useCallback, useState } from "react";
import ToastContainer from "../components/ToastContainer";
import * as uuid from 'uuid';

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

export const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(({type, title, description}: Omit<ToastMessage, 'id'>) => {
    const id = uuid.v4();

    const toast = {
      id,
      type,
      title,
      description
    };

    setMessages((oldMessages) => [...oldMessages, toast]);

  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{addToast, removeToast}}>
      { children }
      <ToastContainer messages={messages}/>
    </ToastContext.Provider>
  )
}
