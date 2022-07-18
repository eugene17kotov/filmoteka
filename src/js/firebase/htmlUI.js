import {
  logregMarkup,
  registerMarkup,
  loginMarkup,
  loggedMarkup,
} from './htmlMarkup';

import { logUser, getCurrentUser, logOut, readNote } from './firebaseAuth';
import {} from '@firebase/util';

// hrefs
const hrefAuthHeaderHtml = document.getElementById('auth-header');
const hrefModalHtml = document.getElementById('auth-modal');
// const loginForm = document.getElementById('login-form');

async function onLoginBtn(e) {
  //   console.log('onLoginBtn');
  e.preventDefault();
  const password = e.target.password.value;
  const email = e.target.email.value;
  const action = e.target.fire.value;
  //   console.log('password ', password, ' email ', email);
  if (action === 'log') {
    const myUser = await logUser(email, password);
    if (myUser.uid) {
      console.log('onLoginBtn   ', myUser);
      console.log('onLoginBtn   ', myUser.uid);

      cleanLoginModal();
      readNote(myUser);
      const dbNote = await readNote(myUser);
      console.log('dbNote   ', dbNote);
      makeLoggedHtml(` user logged as ${dbNote.email} `);
    } else {
      document.getElementById('login-error').innerText = ` ${myUser
        .replace('auth/', '')
        .replaceAll('-', '  ')}, try again! `;
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

function makeLoggedHtml(loggedUser) {
  hrefAuthHeaderHtml.innerHTML = loggedMarkup;
  document.getElementById('logged-user').innerText = loggedUser;
  document.getElementById('logout').addEventListener('click', onLogoutBtn);
}

function onSignButton(e) {
  const tosignin = document.getElementById('tosignin');
  tosignin.removeEventListener('click', onSignButton);

  const tosignup = document.getElementById('tosignup');
  tosignup.removeEventListener('click', onSignButton);

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

export function cleanLoginModal() {
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
