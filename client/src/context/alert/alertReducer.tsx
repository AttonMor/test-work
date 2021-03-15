import { HIDE_ALERT, SHOW_ALERT } from '../types';

export type Action =
  | { type: 'SHOW_ALERT'; payload: { text: string; type: string } }
  | {
      type: 'HIDE_ALERT';
    };

export interface Alert {
  visible: boolean;
}
const handlers = {
  [SHOW_ALERT]: (state: Alert, { payload }: any) => ({
    ...payload,
    visible: true,
  }),
  [HIDE_ALERT]: (state: Alert) => ({ ...state, visible: false }),
  DEFAULT: (state: Alert) => state,
};

export const alertReducer = (state: Alert, action: Action): Alert => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
