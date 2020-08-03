import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import WebFont from 'webfontloader';
import './App.scss';
import App from './App';

const composeEnhancers =
   (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
   reducers,
   composeEnhancers(applyMiddleware(reduxThunk))
);

WebFont.load({
   google: {
      families: ['Lato:bold', 'Lato:regular', 'Lato:light'],
   },
});

ReactDOM.render(
   <Provider store={store}>
      <App />
   </Provider>,
   document.getElementById('root')
);
