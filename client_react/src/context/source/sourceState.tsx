import { useReducer } from 'react';
import axios from 'axios';
import { SourceContext } from './sourceContext';
import { sourceReducer } from './sourceReducer';

export interface AppStateContextProps {
  showLoader(): void;
  fetchSources(url: string): any;
  sources: Source[];
  loading: boolean;
}

export interface ISourceState {
  sources: Source[];
  loading: boolean;
}
interface Source {
  filename: string;
  size: string;
  url: string;
  type: string;
}

export const SourceState = ({ children }: React.PropsWithChildren<{}>) => {
  const initialState: ISourceState = {
    sources: [],
    loading: false,
  };
  
  const [state, dispath] = useReducer(sourceReducer, initialState);

  const showLoader = () => dispath({ type: 'SHOW_LOADER' });
  const fetchSources = async (url: string) => {
    showLoader();
    try {
      const res = await axios.post('', { url });
      dispath({ type: 'FETCH_SOURCES', payload: res.data });
    } catch (error) {
      dispath({ type: 'HIDE_LOADER' });
      throw error;
      // return new Error(error.message);
    }
  };

  return (
    <SourceContext.Provider
      value={{
        showLoader,
        fetchSources,
        loading: state.loading,
        sources: state.sources,
      }}
    >
      {children}
    </SourceContext.Provider>
  );
};
