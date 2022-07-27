import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child } from 'firebase/database';

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';

//

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
  apiKey: 'AIzaSyCjeEfSVnqA0nBYnu1Wz6r9TlDoOJzZTEk',
  authDomain: 'fs48-team-js.firebaseapp.com',
  databaseURL: 'https://fs48-team-js-default-rtdb.firebaseio.com',
  projectId: 'fs48-team-js',
  storageBucket: 'fs48-team-js.appspot.com',
  messagingSenderId: '749054562086',
  appId: '1:749054562086:web:8821117b629776cf373be7',
};

export function connectToBD() {
  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
}

export async function createNewUser(email, password) {
  const auth = getAuth();

  return await createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      // ...
      return user;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..

      return errorCode;
    });
}

// auth
export async function logUser(email, password) {
  const auth = getAuth();
  setPersistence(auth, browserSessionPersistence);
  return await signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;

      return user;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;

      return errorCode;
    });
}

export async function watchUser(user) {
  const auth = getAuth();
  return await onAuthStateChanged(auth, user => {
    if (user) {
      // User is signed in, seeregister docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      return user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
}

// logout
export async function logOut() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      // An error happened.
    });
}

// CRUD

export async function createNote(user, queue, watched) {
  const database = getDatabase();
  await set(ref(database, 'galleries/' + user.uid), {
    queue,
    watched,
  });
}

export async function readNote(user) {
  const dbRef = ref(getDatabase());
  return await get(child(dbRef, `galleries/${user.uid}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        return data;
      } else {
      }
      return snapshot.val();
    })
    .catch(error => {});
}
//
//function updateNote() {}
//
//function deleteNote() {}
//
