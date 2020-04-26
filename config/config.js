import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyCQN044fWNkVpl9VHHaJu0gOFEjFPYNXE8",
    authDomain: "sempioneer.firebaseapp.com",
    databaseURL: "https://sempioneer.firebaseio.com",
    projectId: "sempioneer",
    storageBucket: "sempioneer.appspot.com",
    messagingSenderId: "45551424691",
    appId: "1:45551424691:web:3092d389b56c507b08ccc6",
    measurementId: "G-JXPLSPJGG0"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;