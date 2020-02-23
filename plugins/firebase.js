import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

if (!firebase.apps.length) {
  const config = {
    apiKey: "AIzaSyAGYFYCiv3b46fh8eh1I6masN6UZqOVXLk",
    authDomain: "slack-clone-app-d4ef6.firebaseapp.com",
    databaseURL: "https://slack-clone-app-d4ef6.firebaseio.com",
    projectId: "slack-clone-app-d4ef6",
    storageBucket: "slack-clone-app-d4ef6.appspot.com",
    messagingSenderId: "454330002218"
  }
  firebase.initializeApp(config)
}

const db = firebase.firestore()
export {
  firebase,
  db
}