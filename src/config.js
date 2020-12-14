import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DBURL,
  projectId: 'test-firestore-afc37',
  storageBucket: 'test-firestore-afc37.appspot.com',
  messagingSenderId: '155091697603',
  appId: '1:155091697603:web:bbedc6bd5b8f6b18120776',
};

firebase.initializeApp(firebaseConfig);

export default {
  auth: firebase.auth(),
  firestore: firebase.firestore(),
};
