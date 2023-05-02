import { ObjectId } from "mongodb";
import { dbConnection, closeConnection } from "../config/mongoConnection.js";

import posts from "../data/posts.js";
import users from "../data/users.js";

const db = await dbConnection();
// await db.dropDatabase();

// const patrick = await users.addUser(
//   "tara@gmail.com",
//   "tmcloughlin",
//   "123456789!Tara",
//   "tara",
//   "MAC"
// );

// const tara = await users.addUser(
//   "taramac@gmail.com",
//   "tmcloughlin11",
//   "123456789!Tara",
//   "tara",
//   "mcloughlin", 
// );
// const patrick1 = await users.addUser(
//   "ellen@gmail.com",
//   "ean",
//   "123456789!Tara",
//   "Ellen",
//   "An"
// );

// const tara1 = await users.addUser(
//   "adriel@gmail.com",
//   "adriel",
//   "123456789!Tara",
//   "Adriel",
//   "Pupo", 
// );
// const patrick2 = await users.addUser(
//   "daniel@gmail.com",
//   "dmart",
//   "123456789!Tara",
//   "daniel",
//   "martinez"
// );

// const tara2 = await users.addUser(
//   "andy@gmail.com",
//   "andy11",
//   "123456789!Tara",
//   "andy",
//   "kim", 
// );
// const patrick3 = await users.addUser(
//   "karina@gmail.com",
//   "kberb",
//   "123456789!Tara",
//   "karina",
//   "berbarian"
// );

// const tara3 = await users.addUser(
//   "adam1@gmail.com",
//   "adamM",
//   "123456789!Tara",
//   "adam",
//   "moskowitz", 
// );
// const patrick4 = await users.addUser(
//   "pauline@gmail.com",
//   "pseagul",
//   "123456789!Tara",
//   "pauline",
//   "seagul"
// );

// const tara4 = await users.addUser(
//   "yolo@gmail.com",
//   "yolo11",
//   "123456789!Tara",
//   "yolo",
//   "mcloughlin", 
// );

try {
  await posts.addPost(
    "64504b06225d58278b8a0938",
    "Baseball Hat",
    "2012 edition, lightly used",
    "url",
    ["Clothes", "Sports"],
    "807 Castle Point Terrace"
  );

  await posts.addPost(
    "64504b06225d58278b8a0938",
    "new_textbook",
    "2012 edition, lightly used",
    "url",
    ["Textbook"],
    "807 Castle Point Terrace"
  );

  await posts.addPost(
    "64504b0a225d58278b8a0939",
    "Desk",
    "Brown, lightly used",
    "url",
    ["Furniture"],
    "807 Castle Point Terrace"
  );
  await posts.addPost(
    "64504b0a225d58278b8a0939",
    "Baseball bat",
    "Orange, extra small",
    "url",
    ["Sports"],
    "807 Castle Point Terrace"
  );
  await posts.addPost(
    "64504b0f225d58278b8a093a",
    "Lighting",
    "extra small",
    "url",
    ["Room Decor"],
    "807 Castle Point Terrace"
  );
  await posts.addPost(
    "64504b0f225d58278b8a093a",
    "Mouse",
    "2 months old, lightly used",
    "url",
    ["Electronics"],
    "807 Castle Point Terrace"
  );
  await posts.addPost(
    "64504b1a225d58278b8a093c",
    "keyboard",
    "2 months old, lightly used",
    "url",
    ["Electronics"],
    "807 Castle Point Terrace"
  );
} catch (e) {
  console.log(e);
}
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
