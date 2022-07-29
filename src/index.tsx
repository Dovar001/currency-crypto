import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CryptoContext } from './context';
import 'react-alice-carousel/lib/alice-carousel.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CryptoContext>
      <App />
    </CryptoContext>
  </React.StrictMode>
);
