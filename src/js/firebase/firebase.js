 import { connectToBD, logUser } from './firebaseAuth';

//

import { makeLogRegHtml, makeLoggedHtml } from './htmlUI';

const database = connectToBD();

const auth = getAuth();

onAuthStateChanged(auth, myUser => {
  if (myUser) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = myUser.uid;
    makeLoggedHtml(` user logged as ${myUser.email} `);
    // ...
  } else {
    // User is signed out
    // ...

    makeLogRegHtml();
  }
});
