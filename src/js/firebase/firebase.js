import { connectToBD, logUser } from './firebaseAuth';

//

import { makeLogRegHtml } from './htmlUI';

const database = connectToBD();

// console.log(database);
// localStorage.getItem('watched') !== null)
// localStorage.getItem('queue') !== null)

// main enterance
makeLogRegHtml();

// // save test object to localStorage
