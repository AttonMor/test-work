import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AlertState } from './context/alert/AlertState';
import { SourceState } from './context/source/sourceState';
import { Alert } from './pages/components/Alert';
import { Home } from './pages/Home';
function App() {
  return (
    <SourceState>
      <AlertState>
        <BrowserRouter>
          <div className='container pt-4'>
            <Alert />
            <Switch>
              <Route path={'/'} component={Home} />
            </Switch>
          </div>
        </BrowserRouter>
      </AlertState>
    </SourceState>
  );
}

export default App;
