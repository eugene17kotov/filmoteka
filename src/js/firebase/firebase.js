import {
  getAuth,
  onAuthStateChanged,
  currentUser,
  setCurrentUser,
} from 'firebase/auth';

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

// --- //
// window.addEventListener('resize', resizeWindow);

// function resizeWindow() {
//   if (window.innerWidth < 767) {
//     console.log('< 767');
//     document.getElementById('auth-header').classList.add('dispnone');
//   } else {
//     console.log('> 767');
//     document.getElementById('auth-header').remove('dispnone');
//   }

// +++++++++ //

// console.log(hrefAuthHeaderHtml.classList);
// }
