import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.css';  // Ant Design CSS
import './index.css';  // Custom global styles
import App from './App';  // Main App component

// Create the root and render the main App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
