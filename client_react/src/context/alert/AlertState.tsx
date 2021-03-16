import React, { useReducer } from 'react';
import { AlertContext } from './alertContext';
import { Alert, alertReducer } from './alertReducer';
import { HIDE_ALERT, SHOW_ALERT } from '../types';

export interface AlertStateContextProps {
  hide(): void;
  show(text: string, type: string): void;
  alert: Alert;
}

export const AlertState = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispath] = useReducer(alertReducer, { visible: false });
  const show = (text: string, type = 'warning') => {
    dispath({
      type: SHOW_ALERT,
      payload: { text, type },
    });
    setTimeout(() => dispath({ type: HIDE_ALERT }), 5000);
  };

  const hide = () => dispath({ type: HIDE_ALERT });
  return (
    <AlertContext.Provider value={{ show, hide, alert: state }}>
      {children}
    </AlertContext.Provider>
  );
};
