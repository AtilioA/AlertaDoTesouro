import React, { createContext, useCallback } from "react";
import api from "../services/api";

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  email: string;
  signIn(credentials: SignInCredentials): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData); // Do not use a default value for AuthContext

export const AuthProvider: React.FC = ({children}) => {
  const signIn = useCallback(async ({email, password}: SignInCredentials) => {
    const response = await api.post('sessions', {
      email,
      password
    });

    console.log(response.data)
  }, []);

  return (
    <AuthContext.Provider value={{email: "a@a.com", signIn}}>
      {children}
    </AuthContext.Provider>
  )
}
