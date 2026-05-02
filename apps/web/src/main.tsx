import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeApiUrl } from '@lottery/shared/utils';
import './index.css';
import App from './App.tsx';

initializeApiUrl(import.meta.env.VITE_API_URL);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
