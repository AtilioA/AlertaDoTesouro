import { BaseLayoutProps, ToastProvider } from './ToastContext';
import { AuthProvider } from './AuthContext';

export default function AppProvider({ children }: BaseLayoutProps) {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
}
