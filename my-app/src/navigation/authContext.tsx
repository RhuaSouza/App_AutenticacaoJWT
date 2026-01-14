// src/contexts/AuthContext.tsx
import { createContext } from 'react';

type AuthContextType = {
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  setAuthenticated: () => {},
});
