import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.querySelector('#root'));
registerServiceWorker();
