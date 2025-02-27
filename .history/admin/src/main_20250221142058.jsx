import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // นำเข้าไฟล์ CSS ของคุณ
import '@heroui/react/dist/styles.css'; // นำเข้าไฟล์ CSS ของ Hero UI
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
