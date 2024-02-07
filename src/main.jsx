import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // 엄격한 모드 실행시 모든 컴포넌트가 두 번씩 렌더링됨
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
