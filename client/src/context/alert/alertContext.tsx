import { createContext } from 'react';
import { AlertStateContextProps } from './AlertState';

export const AlertContext = createContext<AlertStateContextProps>(
  {} as AlertStateContextProps
);
