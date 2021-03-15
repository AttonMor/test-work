import { FETCH_SOURCES, SHOW_LOADER, HIDE_LOADER } from '../types';
import { ISourceState } from './sourceState';

export type Action =
  | {
      type: 'FETCH_SOURCES';
      payload: {
        sources: ISourceState[];
      };
    }
  | {
      type: 'SHOW_LOADER';
    }
  | {
      type: 'HIDE_LOADER';
    };

const handlers = {
  [SHOW_LOADER]: (state: ISourceState) => ({
    ...state,
    sources: [],
    loading: true,
  }),
  [HIDE_LOADER]: (state: ISourceState) => ({ ...state, loading: false }),
  [FETCH_SOURCES]: (state: ISourceState, { payload }: any) => {
    return {
      ...state,
      loading: false,
      sources: payload,
    };
  },
  DEFAULT: (state: ISourceState) => state,
};

export const sourceReducer = (
  state: ISourceState,
  action: Action
): ISourceState => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
