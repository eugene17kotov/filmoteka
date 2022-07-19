import { connectToBD, logUser } from './firebaseAuth';

//

import { makeLogRegHtml } from './htmlUI';

const database = connectToBD();

// console.log(database);

// main enterance
makeLogRegHtml();

// // save test object to localStorage
