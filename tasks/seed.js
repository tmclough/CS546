import {dbConnection, closeConnection} from '../config/mongoConnection.js';

import posts from '../data/posts.js';

const db = await dbConnection();
await db.dropDatabase();


await posts.addPost('Chem Textbook', '2012 edition, lightly used');

await posts.addPost('1Textbook', '2012 edition, lightly used');




console.log('Done seeding database');

await closeConnection();
