
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// FIX: Import global type definitions to resolve JSX intrinsic element errors.
// FIX: Corrected path to point to src/types.ts which contains the global JSX type augmentations.
import './src/types';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);