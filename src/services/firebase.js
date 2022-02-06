// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import 'firebase/firestore'

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyBACRgKW-3nAIcHVYlly0sXahxBnxe6T_0',
  authDomain: 'ayebeesee-561c2.firebaseapp.com',
  projectId: 'ayebeesee-561c2',
  storageBucket: 'ayebeesee-561c2.appspot.com',
  messagingSenderId: '591925014655',
  appId: '1:591925014655:web:5c56a2f09437b941218f4a',
  measurementId: 'G-SZFFPTRX6Z'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
