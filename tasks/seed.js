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
//   "mcloughlin"
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
//   "Pupo"
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
//   "kim"
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
//   "moskowitz"
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
//   "mcloughlin"
// );

try {
  await posts.addPost(
    "6456f47118637253b381fb45",
    "Baseball Hat",
    "2012 edition, lightly used",
    [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png",
    ],
    ["Clothing", "Sport Equipment"],
    "807 Castle Point Terrace"
  );
  await posts.addPost(
    "6456f47118637253b381fb45",
    "Full size bed",
    "large bed",
    [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png",
    ],
    ["Furniture"],
    "807 Castle Point Terrace"
  );
  await posts.addPost(
    "6456f47418637253b381fb46",
    "new_textbook",
    "2012 edition, lightly used",
    [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png",
    ],
    ["Books"],
    "807 Castle Point Terrace"
  );

  await posts.addPost(
    "6456f47418637253b381fb46",
    "Desk",
    "Brown, lightly used",
    [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png",
    ],
    ["Furniture"],
    "807 Castle Point Terrace"
  );
  await posts.addPost(
    "6456f47818637253b381fb47",
    "Baseball bat",
    "Orange, extra small",
    [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png",
    ],
    ["Sport Equipment"],
    "807 Castle Point Terrace"
  );
  await posts.addPost(
    "6456f47818637253b381fb47",
    "Lighting",
    "extra small",
    [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png",
    ],
    ["Other"],
    "807 Castle Point Terrace"
  );
  await posts.addPost(
    "6456f47c18637253b381fb48",
    "Mouse",
    "2 months old, lightly used",
    [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png",
    ],
    ["Electronics"],
    "807 Castle Point Terrace"
  );
  await posts.addPost(
    "6456f47c18637253b381fb48",
    "keyboard",
    "2 months old, lightly used",
    [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png",
    ],
    ["Electronics"],
    "807 Castle Point Terrace"
  );
} catch (e) {
  console.log(e);
}
// await posts.addPost(
//   "6456f47f18637253b381fb49",
//   "new textbook",
//   "2012 edition, lightly used",
//   [],
//   "807 Castle Point Terrace"
// );

// await posts.addPost(
//   "6456f47f18637253b381fb49",
//   "new textbook",
//   "2012 edition, lightly used",
//   [],
//   "807 Castle Point Terrace"
// );

// await posts.addPost(
//   "6456f48318637253b381fb4a",
//   "new textbook",
//   "2012 edition, lightly used",
//   [],
//   "807 Castle Point Terrace"
// );

// await posts.addPost(
//   "6456f48318637253b381fb4a",
//   "new textbook",
//   "2012 edition, lightly used",
//   [],
//   "807 Castle Point Terrace"
// );

// await posts.addPost(
//   "6456f48618637253b381fb4b",
//   "new textbook",
//   "2012 edition, lightly used",
//   [],
//   "807 Castle Point Terrace"
// );

// await posts.addPost(
//   "6456f48618637253b381fb4b",
//   "new textbook",
//   "2012 edition, lightly used",
//   [],
//   "807 Castle Point Terrace"
// );

console.log("Done seeding database");

await closeConnection();
