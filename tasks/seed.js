import { ObjectId } from "mongodb";
import { dbConnection, closeConnection } from "../config/mongoConnection.js";

import posts from "../data/posts.js";
import users from "../data/users.js";

const db = await dbConnection();
//await db.dropDatabase();

// const patrick = await users.addUser(
//   "tara@gmail.com",
//   "tmcloughlin",
//   "123456789!Tara",
//   "tara",
//   "mcloughlin"
// );

await posts.addPost(
  "6440a8f03e8eb999ca9a8cdf",
  "chem textbook",
  "2012 edition, lightly used",
  ["Clothing", "Books", "Textbooks"],
  "807 Castle Point Terrace"
);

await posts.addPost(
  "6440a8f03e8eb999ca9a8cdf",
  "new textbook",
  "2012 edition, lightly used",
  [],
  "807 Castle Point Terrace"
);

await posts.addPost(
  "6440a8f03e8eb999ca9a8cdf",
  "new textbook",
  "2012 edition, lightly used",
  ["Furniture"],
  "807 Castle Point Terrace"
);

// await posts.addPost(
//   "6440a8f03e8eb999ca9a8cdf",
//   "new textbook",
//   "2012 edition, lightly used",
//   [],
//   "807 Castle Point Terrace"
// );

// await posts.addPost(
//   "6440a8f03e8eb999ca9a8cdf",
//   "new textbook",
//   "2012 edition, lightly used",
//   [],
//   "807 Castle Point Terrace"
// );

// await posts.addPost(
//   "6440a8f03e8eb999ca9a8cdf",
//   "new textbook",
//   "2012 edition, lightly used",
//   [],
//   "807 Castle Point Terrace"
// );

// await posts.addPost(
//   "6440a8f03e8eb999ca9a8cdf",
//   "new textbook",
//   "2012 edition, lightly used",
//   [],
//   "807 Castle Point Terrace"
// );

// await posts.addPost(
//   "6440a8f03e8eb999ca9a8cdf",
//   "new textbook",
//   "2012 edition, lightly used",
//   [],
//   "807 Castle Point Terrace"
// );

// await posts.addPost(
//   "6440a8f03e8eb999ca9a8cdf",
//   "new textbook",
//   "2012 edition, lightly used",
//   [],
//   "807 Castle Point Terrace"
// );

console.log("Done seeding database");

await closeConnection();
