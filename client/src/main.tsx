import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App/App';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <footer className="gsl">
        За помощью обращайтесь по номеру:
        <p>+7 (812) 246-27-08</p>
        <p>+7 (812) 246-27-98</p>
        <p>+7 (812) 246-10-51</p>
      </footer>
    </BrowserRouter>
  </Provider>,
  // </React.StrictMode>
);
