import { combineReducers } from 'redux';
import prisoners from './prisoners';
import prisons from './prisons';
import authReducer from './auth';
import userReducer from './users'
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import RuleReducer from './rules';
import messageReducer from './messages';

export default combineReducers({
  prisoners: prisoners,
  prisons: prisons,
  users: userReducer,
  auth: authReducer,
  rules: RuleReducer,
  messages: messageReducer,
  
  firebase: firebaseReducer,
  firestore: firestoreReducer
});
