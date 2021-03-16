import { createContext } from 'react';
import { AppStateContextProps } from './sourceState';

export const SourceContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);
