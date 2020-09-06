import { createContext } from "react";

interface AuthContextData {
  email: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData); // Do not use a default value for AuthContext

export default AuthContext;
