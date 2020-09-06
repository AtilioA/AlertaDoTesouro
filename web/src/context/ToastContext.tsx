import React, { createContext, useCallback } from "react";
import ToastContainer from "../components/ToastContainer";

interface ToastContextData {
  addToast(): void;
  removeToast(): void;
}

export const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const addToast = useCallback(() => {
    console.log('addToast')
  }, []);

  const removeToast = useCallback(() => {
    console.log('removeToast')
  }, []);

  return (
    <ToastContext.Provider value={{addToast, removeToast}}>
      { children }
      <ToastContainer/>
    </ToastContext.Provider>
  )
}
