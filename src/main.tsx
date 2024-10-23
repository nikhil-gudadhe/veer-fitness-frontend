import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from '../store/store.ts';
//, { persistor }
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
//import { PersistGate } from 'redux-persist/integration/react';
//import { Loader } from './components/index.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}> 
    {/* <PersistGate loading={<Loader />} persistor={persistor}> */}
      <Router>
        <App />
      </Router>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>,
);
