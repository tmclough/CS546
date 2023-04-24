import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import validation from "../validation.js";
import bcrypt from "bcrypt";
const saltRounds = 16;

let exportedMethods = {
  async getUserByUsernamePassword(username, password) {
    username = validation.checkUsername(username, "username");
    password = validation.checkPassword(password, "password");

    const userCollection = await users();
    const user = await userCollection.findOne({ username: username });
    if (!user) throw "Error: invalid username or password";

    let passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw "Error: invalid username or password";
    user._id = user._id.toString();
    return user;
  },

  async getAll() {
    const userCollection = await users();
    let userList = await userCollection.find({}).toArray();
    if (!userList) throw "Could not get all users";
    userList = userList.map((element) => {
      element._id = element._id.toString();
      return element;
    });
    return userList;
  },

  async addUser(email, username, password, firstName, lastName) {


    email = validation.checkEmail(email, "email");
    username = validation.checkUsername(username, "username");
    password = validation.checkPassword(password, "password");
    firstName = validation.checkFirstAndLastName(firstName, "firstName");
    lastName = validation.checkFirstAndLastName(lastName, "lastName");


    const userCollection = await users();
    const dupUsername = await userCollection.findOne({ username: username });
    if (dupUsername) throw "Error: username already in use";
    const dupEmail = await userCollection.findOne({ email: email });
    if (dupEmail) throw "Error: username already in use";

    const hash = await bcrypt.hash(password, saltRounds);

    let newUser = {
      email: email,
      username: username,
      password: hash,
      firstName: firstName,
      lastName: lastName
    }

    const insertedInfo = await userCollection.insertOne(newUser);
    if (!insertedInfo.insertedId) throw "Error: insert failed.";

    return await this.getUserById(insertedInfo.insertedId.toString());
  },

  async getUserById(id) {

    id = validation.checkId(id);

    const userCollection = await users();
    const userInfo = await userCollection.findOne({ _id: new ObjectId(id) });
    if (!userInfo) throw `Error: no user found with id ${id}`;
    userInfo._id = userInfo._id.toString();
    return userInfo;
  }

};

export default exportedMethods;
