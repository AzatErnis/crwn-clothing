import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAVSBt0ZI5Q4by7lSEnCo5pOFqlmZbQBAQ",
  authDomain: "crwn-dbase.firebaseapp.com",
  databaseURL: "https://crwn-dbase.firebaseio.com",
  projectId: "crwn-dbase",
  storageBucket: "crwn-dbase.appspot.com",
  messagingSenderId: "1060350750510",
  appId: "1:1060350750510:web:f9e51516da1470679a14bf",
  measurementId: "G-C34LPG61V1"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error, creating user', error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
