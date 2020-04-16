import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyATize9TSmcAO55d8FagdfeMX9G9L4iFps",
    authDomain: "test-343b4.firebaseapp.com",
    databaseURL: "https://test-343b4.firebaseio.com",
    projectId: "test-343b4",
    storageBucket: "test-343b4.appspot.com",
    messagingSenderId: "737064923611",
    appId: "1:737064923611:web:a1ec5f47df2617612c77fe",
    measurementId: "G-SKTTM1GEYP"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;