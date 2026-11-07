import './styles/base.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AppShell from './components/layout/AppShell';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppShell>
        <App />
      </AppShell>
    </BrowserRouter>
  </React.StrictMode>,
);
