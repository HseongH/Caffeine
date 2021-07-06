import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCXcWGawDF9bQmSO_qbbIu03yMdEU9Zc64',
  authDomain: 'community-553a8.firebaseapp.com',
  projectId: 'community-553a8',
  storageBucket: 'community-553a8.appspot.com',
  messagingSenderId: '1068004354347',
  appId: '1:1068004354347:web:f6cbc7900f1887bb7dbd6e',
  measurementId: 'G-L4GHZ9KG5S',
};

firebase.initializeApp(firebaseConfig);

export const apiKey = firebaseConfig.apiKey;
export const auth = firebase.auth();
export const firestore = firebase.firestore();
