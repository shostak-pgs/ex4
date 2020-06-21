import * as serviceWorker from './serviceWorker';
import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './components/store/Store';

   ReactDOM.render(
      <BrowserRouter>
         <Provider store = {store}>
            <App/>
         </Provider>
     </BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
