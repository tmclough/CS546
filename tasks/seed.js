import { ObjectId } from "mongodb";
import { dbConnection, closeConnection } from "../config/mongoConnection.js";

import posts from "../data/posts.js";
import users from "../data/users.js";
import { commentData } from "../data/index.js";

async function main() {
  console.log("Seeding database (it might take a minute due to hashing)...");

  const db = await dbConnection();
  await db.dropDatabase();

  //adding users

  let tara;
  try {
    tara = await users.addUser(
      "taramac@gmail.com",
      "tmcloughlin11",
      "Tara2023#",
      "tara",
      "mcloughlin"
    );
  } catch (e) {
    console.log(e);
  }

  let daniel;

  try {
    daniel = await users.addUser(
      "dmartin7@stevens.edu",
      "danymz",
      "Daniel2023#",
      "Daniel",
      "Martinez"
    );
  } catch (e) {
    console.log(e);
  }

  let andrew;
  try {
    andrew = await users.addUser(
      "andy@gmail.com",
      "andy11",
      "Andy2023#",
      "andy",
      "kim"
    );
  } catch (e) {
    console.log(e);
  }

  let ellen;
  try {
    ellen = await users.addUser(
      "ellen@gmail.com",
      "ean",
      "Ellen2023#",
      "Ellen",
      "An"
    );
  } catch (e) {
    console.log(e);
  }

  let karina;
  try {
    karina = await users.addUser(
      "karina@gmail.com",
      "kberb",
      "Karina2023#",
      "karina",
      "berbarian"
    );
  } catch (e) {
    console.log(e);
  }

  let pauline;
  try {
    pauline = await users.addUser(
      "pauline@gmail.com",
      "pseagul",
      "Pauline2023#",
      "pauline",
      "seagul"
    );
  } catch (e) {
    console.log(e);
  }
  let robert;
  try {
    robert = await users.addUser(
      "robert@gmail.com",
      "rob1234",
      "Rob2023#",
      "robert",
      "miller"
    );
  } catch (e) {
    console.log(e);
  }
  let patty;
  try {
    patty = await users.addUser(
      "patty@gmail.com",
      "patty",
      "Patty2023#",
      "patty",
      "mcloughlin"
    );
  } catch (e) {
    console.log(e);
  }
  let stacy;
  try {
    stacy = await users.addUser(
      "stacy123@gmail.com",
      "stacylovesposts",
      "Stacy2023#",
      "stacy",
      "an"
    );
  } catch (e) {
    console.log(e);
  }
  let yong;
  try {
    yong = await users.addUser(
      "yongan@gmail.com",
      "yan!!",
      "Yong2023#",
      "yong",
      "an"
    );
  } catch (e) {
    console.log(e);
  }
  let tom;
  try {
    tom = await users.addUser(
      "tom13456@yahoo.com",
      "tomlovesfree",
      "Thomas2023#",
      "thomas",
      "mcloughlin"
    );
  } catch (e) {
    console.log(e);
  }

  //Adding posts

  let danielPost1;
  try {
    danielPost1 = await posts.addPost(
      daniel._id,
      "Microwave",
      "Slightly Used Microwave, works fine",
      [
        "https://cs546project.s3.us-east-2.amazonaws.com/microwave_1.jpg",
        "https://cs546project.s3.us-east-2.amazonaws.com/microwave_2.jpg",
      ],
      ["Electronics", "Appliances"],
      "Davis Hall"
    );
  } catch (e) {
    console.log(e);
  }

  let danielPost2;
  try {
    danielPost2 = await posts.addPost(
      daniel._id,
      "Night Table",
      "Free night table, it's gotta a few scratches but it looks good.",
      ["https://cs546project.s3.us-east-2.amazonaws.com/nightTable.jpg"],
      ["Furniture"],
      "Lore-El Center"
    );
  } catch (e) {
    console.log(e);
  }

  let taraPost1;
  try {
    taraPost1 = await posts.addPost(
      tara._id,
      "Baseball Hat",
      "New York Yankees baseball hat",
      [
        "https://cs546project.s3.us-east-2.amazonaws.com/baseball_hat_1.jpg",
        "https://cs546project.s3.us-east-2.amazonaws.com/baseball_hat_2.jpg",
      ],
      ["Clothing", "Sport Equipment"],
      "807 Castle Point Terrace"
    );
  } catch (e) {
    console.log(e);
  }

  let andrewPost1;
  try {
    andrewPost1 = await posts.addPost(
      andrew._id,
      "Twin mattress",
      "Memory foam twin matress, used but new. clean",
      [
        "https://cs546project.s3.us-east-2.amazonaws.com/mattress_1.jpg",
        "https://cs546project.s3.us-east-2.amazonaws.com/mattress_2.jpg",
        "https://cs546project.s3.us-east-2.amazonaws.com/mattress_3.jpg",
      ],
      ["Furniture", "Other"],
      "North Building"
    );
  } catch (e) {
    console.log(e);
  }

  let andrewPost2;
  try {
    andrewPost2 = await posts.addPost(
      andrew._id,
      "Chemistry Textbook ",
      "Chemistry 9th edition, by Zumdahl",
      ["https://cs546project.s3.us-east-2.amazonaws.com/chem_textbook.jpg"],
      ["Books", "School Supplies"],
      "Wesley J. Howe Center"
    );
  } catch (e) {
    console.log(e);
  }

  let ellenPost1;
  try {
    ellenPost1 = await posts.addPost(
      ellen._id,
      "Mouse",
      "Logitech mouse, almot new",
      ["https://cs546project.s3.us-east-2.amazonaws.com/mouse.jpg"],
      ["Electronics"],
      "Wesley J. Howe Center"
    );
  } catch (e) {
    console.log(e);
  }

  let ellenPost2;
  try {
    ellenPost2 = await posts.addPost(
      ellen._id,
      "Keyboard",
      "Logitech keyboard, almot new",
      ["https://cs546project.s3.us-east-2.amazonaws.com/keyboard.jpg"],
      ["Electronics"],
      "Wesley J. Howe Center"
    );
  } catch (e) {
    console.log(e);
  }

  let ellenPost3;
  try {
    ellenPost3 = await posts.addPost(
      ellen._id,
      "Desk",
      "Brown, lightly used",
      [
        "https://cs546project.s3.us-east-2.amazonaws.com/desk_1.jpg",
        "https://cs546project.s3.us-east-2.amazonaws.com/desk_2.jpg",
      ],
      ["Furniture"],
      "South Tower"
    );
  } catch (e) {
    console.log(e);
  }

  let karinaPost1;
  try {
    karinaPost1 = await posts.addPost(
      karina._id,
      "CS textbook",
      "CS 101 textbook, good conditions",
      ["https://cs546project.s3.us-east-2.amazonaws.com/cs_textbook.jpg"],
      ["Books"],
      "River Terrace"
    );
  } catch (e) {
    console.log(e);
  }

  let paulinePost1;
  try {
    paulinePost1 = await posts.addPost(
      pauline._id,
      "CS textbook (Data Structures and Algorithms)",
      "CS textbook, data structures and algorithms, in good conditions",
      ["https://cs546project.s3.us-east-2.amazonaws.com/cs_textbook_2.jpg"],
      ["Books"],
      "Wesley J. Howe Center"
    );
  } catch (e) {
    console.log(e);
  }

  //Adding comment and replies
  let commentOnDanielPost1;
  try {
    commentOnDanielPost1 = await commentData.addComment(
      tara._id,
      danielPost1.id,
      "When can I pick it up?"
    );
  } catch (e) {
    console.log(e);
  }

  let replyOnDanielPost1;
  try {
    replyOnDanielPost1 = await commentData.replyToComment(
      daniel._id,
      commentOnDanielPost1._id.toString(),
      "I'll be here today from 12 to 6 and tomorrow all day."
    );
  } catch (e) {
    console.log(e);
  }

  let commentOnAndrewPost1;
  try {
    commentOnAndrewPost1 = await commentData.addComment(
      karina._id,
      andrewPost1.id,
      "Is this a soft mattress?"
    );
  } catch (e) {
    console.log(e);
  }

  let replyOnAndrewPost1;
  try {
    replyOnAndrewPost1 = await commentData.replyToComment(
      andrew._id,
      commentOnAndrewPost1._id.toString(),
      "It's super soft! Feels like a cloud."
    );
  } catch (e) {
    console.log(e);
  }

  let commentOnEllenPost1;
  try {
    commentOnEllenPost1 = await commentData.addComment(
      pauline._id,
      ellenPost1.id,
      "Is this mouse good for playing video games?"
    );
  } catch (e) {
    console.log(e);
  }

  let replyOnEllenPost1;
  try {
    replyOnEllenPost1 = await commentData.replyToComment(
      ellen._id,
      commentOnEllenPost1._id.toString(),
      "It's perfect for gaming!"
    );
  } catch (e) {
    console.log(e);
  }

  let commentOnEllenPost2;
  try {
    commentOnEllenPost2 = await commentData.addComment(
      tara._id,
      ellenPost1.id,
      "I wish I saw this sooner!"
    );
  } catch (e) {
    console.log(e);
  }

  let commentOnTaraPost1;
  try {
    commentOnTaraPost1 = await commentData.addComment(
      ellen._id,
      taraPost1.id,
      "Is this one size fits all?"
    );
  } catch (e) {
    console.log(e);
  }

  let reply1OnTaraPost1;
  try {
    reply1OnTaraPost1 = await commentData.replyToComment(
      karina._id,
      commentOnTaraPost1._id.toString(),
      "I was wondering the same thing."
    );
  } catch (e) {
    console.log(e);
  }

  let reply2OnTaraPost1;
  try {
    reply2OnTaraPost1 = await commentData.replyToComment(
      tara._id,
      commentOnTaraPost1._id.toString(),
      "Yep! It's adjustable in the back."
    );
  } catch (e) {
    console.log(e);
  }
  console.log("Done seeding database");
  await closeConnection();
}

main();
