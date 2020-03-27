import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';

import "todomvc-app-css/index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
