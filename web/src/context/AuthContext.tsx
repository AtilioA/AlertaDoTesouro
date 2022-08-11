/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// FIXME !!
import { createContext, useCallback, useState } from 'react';
import { BaseLayoutProps } from './ToastContext';
import api from '../services/api';
import axiosInstance from '../config/axios';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  token: string;
  user: object;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
); // Do not use a default value for AuthContext

export function AuthProvider({ children }: BaseLayoutProps) {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@AlertaDoTesouro:token');
    const user = localStorage.getItem('@AlertaDoTesouro:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post<{ token: string; user: object }>(
      'sessions',
      {
        email,
        password,
      },
    );

    const { token, user } = response.data;
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('@AlertaDoTesouro:token', token);
    localStorage.setItem('@AlertaDoTesouro:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@AlertaDoTesouro:token');
    localStorage.removeItem('@AlertaDoTesouro:user');

    setData({} as AuthState);
  }, []);

  return (
    // FIXME
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
