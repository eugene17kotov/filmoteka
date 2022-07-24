 import {
   logregMarkup,
  registerMarkup,
  loginMarkup,
  loggedMarkup,
} from './htmlMarkup';

import {
  logUser,
  watchUser,
  logOut,
  createNote,
  readNote,
  createNewUser,
} from './firebaseAuth';

import {
  getAuth,
  onAuthStateChanged,
  currentUser,
  setCurrentUser,
} from 'firebase/auth';

import {} from '@firebase/util';

// hrefs
const hrefAuthHeaderHtml = document.getElementById('auth-header');
const hrefModalHtml = document.getElementById('auth-modal');

async function onLoginBtn(e) {
  e.preventDefault();
  const password = e.target.password.value;
  const email = e.target.email.value;
  const action = e.target.fire.value;
  if (action === 'log') {
    const myUser = await logUser(email, password);

    if (myUser.uid) {
      cleanLoginModal();

      const auth = getAuth();
      onAuthStateChanged(auth, myUser => {
        if (myUser) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = myUser.uid;
          // ...
        } else {
          // User is signed out
          // ...
        }
      });

      const dbNote = await readNote(myUser);

      const watched = dbNote.watched;
      const queue = dbNote.queue;

      if (watched) {
        localStorage.setItem('watched', watched);
      }
      if (queue) {
        localStorage.setItem('queue', queue);
      }

      makeLoggedHtml(` user logged as ${myUser.email} `);
    } else {
      document.getElementById('login-error').innerText = ` ${myUser
        .replace('auth/', '')
        .replaceAll('-', '  ')}, check your email and try again or signup! `;
    }
  } else {
    const createdUser = await createNewUser(email, password);

    if (createdUser.uid) {
      const myUser = await logUser(email, password);
      const queue = localStorage.getItem('queue') || [];
      const watched = localStorage.getItem('watched') || [];

      await createNote(createdUser, queue, watched);
      cleanLoginModal();

      makeLoggedHtml(` user logged as ${myUser.email} `);
    } else {
      document.getElementById('login-error').innerText = ` ${createdUser
        .replace('auth/', '')
        .replaceAll('-', '  ')}, try to signin instead! `;
    }
  }
}

async function onLogoutBtn(e) {
  e.target.removeEventListener('click', onLogoutBtn);

  await logOut();
  makeLogRegHtml();
}

function cancelLogin(e) {
  cleanLoginModal();
  makeLogRegHtml();
}

export function makeLogRegHtml() {
  hrefAuthHeaderHtml.innerHTML = logregMarkup;
  const container = document.getElementById('login-status');
  const signin = document.getElementById('tosignin');
  const signup = document.getElementById('tosignup');
  signin.addEventListener('click', onSignButton);
  signup.addEventListener('click', onSignButton);
}

export function makeLoggedHtml(loggedUser) {
  hrefAuthHeaderHtml.innerHTML = loggedMarkup;
  document.getElementById('logged-user').innerText = loggedUser;
  document.getElementById('logout').addEventListener('click', onLogoutBtn);
}

 function onSignButton(e) {
   document
     .getElementById('tosignin')
     .removeEventListener('click', onSignButton);

   document
     .getElementById('tosignup')
     .removeEventListener('click', onSignButton);

   if (e.target === tosignin) {
     makeLoginModalHtml();
     const { closeBackdrop, form } = getElementsLoginModal();
     closeBackdrop.addEventListener('click', cancelLogin);
     form.addEventListener('submit', onLoginBtn);
   } else {
     
     makeRegisterModalHtml();
     const { closeBackdrop, form } = getElementsLoginModal();
    closeBackdrop.addEventListener('click', cancelLogin);
    form.addEventListener('submit', onLoginBtn);
  } 
}
 

//  LoginModal part

 function getElementsLoginModal() {
   const modal = document.getElementById('auth-modal');
   const closeBackdrop = document.getElementById('close-backdrop');
   const signup = document.getElementById('signup');
   const signin = document.getElementById('signin');
   const form =
     document.getElementById('login-form') ||
     document.getElementById('signup-form');
   return { modal, closeBackdrop, signup, signin, form };
 }

 function cleanLoginModal() {
   const { modal, closeBackdrop, form } = getElementsLoginModal();

   closeBackdrop.removeEventListener('click', cancelLogin);

   form.removeEventListener('submit', onLoginBtn);
   form.reset();
   modal.innerHTML = '';
 }

 function makeLoginModalHtml() {
  hrefModalHtml.innerHTML = loginMarkup;
 }

 function makeRegisterModalHtml() {
   hrefModalHtml.innerHTML = registerMarkup;
 }
