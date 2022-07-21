import { getAuth, onAuthStateChanged } from 'firebase/auth';

import {
  logregMarkup,
  registerMarkup,
  loginMarkup,
  loggedMarkup,
} from './htmlMarkup';

import {
  logUser,
  // getCurrentUser,
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

    // console.log('myUser   '); getAuth
    // console.log(myUser);
    // console.log(await getCurrentUser());

    if (myUser.uid) {
      cleanLoginModal();

      const auth = getAuth();
      onAuthStateChanged(auth, myUser => {
        if (myUser) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = myUser.uid;
          console.log(uid);
          // ...
        } else {
          // User is signed out
          // ...
        }
      });

      // readNote(myUser);
      const dbNote = await readNote(myUser);
      console.log('dbNote   ', dbNote);
      const watched = dbNote.watched;
      const queue = dbNote.queue;

      // add get JSON from DB
      if (watched) {
        localStorage.setItem('watched', watched);
      }
      if (queue) {
        localStorage.setItem('queue', queue);
      }

      // getCurrentUser();

      makeLoggedHtml(` user logged as ${myUser.email} `);
    } else {
      document.getElementById('login-error').innerText = ` ${myUser
        .replace('auth/', '')
        .replaceAll('-', '  ')}, check your email and try again or signup! `;
    }
  } else {
    // create a new user here
    const createdUser = await createNewUser(email, password);
    // console.log('createdUser   ', createdUser);
    if (createdUser.uid) {
      // login here
      const myUser = await logUser(email, password);
      const queue = localStorage.getItem('queue') || [];
      const watched = localStorage.getItem('watched') || [];
      // console.log(myUser);
      // console.log(queue);
      // console.log(watched);

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
  //   getCurrentUser();
  makeLogRegHtml();
}

function cancelLogin(e) {
  console.log('cancelLogin');
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
    //  qqqqqqqqqqq   qqqq qqqqq
    makeRegisterModalHtml();
    const { closeBackdrop, form } = getElementsLoginModal();
    closeBackdrop.addEventListener('click', cancelLogin);
    form.addEventListener('submit', onLoginBtn);
  }
}

// LoginModal part

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
