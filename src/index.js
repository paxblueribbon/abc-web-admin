import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '/Users/paxie/Documents/AyeBeeSee/Web-Admin/abc-web-admin/src/css/materialize.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from './services/firebase';
import 'firebase/firestore'

// const firebase = getFirebase;

const rrfConfig = {
  ...firebase,
  // userProfile: 'users',
  // useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  // createFirestoreInstance
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();