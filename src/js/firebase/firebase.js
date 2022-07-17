import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, onValue } from 'firebase/database';

import { connectToBD, logUser } from './firebaseAuth';

//

import { makeLogRegHtml } from './htmlUI';

const database = connectToBD();

console.log(database);

// loginForm.addEventListener('submit', onFormSubmit);
// function onFormSubmit(e) {
//   e.preventDefault();
//   const password = e.target.password.value;
//   const email = e.target.email.value;

//   //   console.log(password, ' - ', email, ' - ', name);
//   console.log(password, ' - ', email);

//   const auth = getAuth();
//   signInWithEmailAndPassword(auth, email, password)
//     .then(userCredential => {
//       // Signed in // 112233
//       const user = userCredential.user;
//       console.log(user);
//       console.log('currentUser ', auth.currentUser);

//       // ...
//       if (user !== null) {
//         // The user object has basic properties such as display name, email, etc.
//         const displayName = user.displayName;
//         // const email = user.email;
//         // const photoURL = user.photoURL;
//         // const emailVerified = user.emailVerified;

//         // The user's ID, unique to the Firebase project. Do NOT use
//         // this value to authenticate with your backend server, if
//         // you have one. Use User.getToken() instead.
//         const uid = user.uid;
//         console.log(displayName);
//         console.log(uid);
//       }
//       const database = getDatabase();
//       //   set(ref(database, 'galleries/' + user.uid), {
//       //     username: 'dfdfdfdfdfddfdfdfdfdf',
//       //     email: email,
//       //   });

//       //

//       const dataRef = ref(database, 'galleries/' + user.uid);
//       onValue(dataRef, snapshot => {
//         const data = snapshot.val();
//         console.log(data);
//       });
//     })

// }

// main enterance

makeLogRegHtml();
