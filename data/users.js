import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import validation from "../validation.js";

let exportedMethods = {
  async getUserByUsernamePassword(username, password) {
    username = validation.checkString(username);
    password = validation.checkString(password);
    const userCollection = await users();
    const user = await userCollection.findOne({ username, password });
    if (!user) throw "Error: User not found";
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

    try {
      email = validation.checkString(email, "email");
      username = validation.checkString(username, "username");
      password = validation.checkString(password, "password");
      firstName = validation.checkString(firstName, "firstName");
      lastName = validation.checkString(lastName, "lastName");
    } catch (e) {
      throw `Error: ${e}`;
    }

    let prevUsers = await this.getAll();
    for (let i in prevUsers) {
      if (prevUsers[i].email === email) {
        throw "Error: email already in use";
      }
      if (prevUsers[i].username === username) {
        throw "Error: username already in use";
      }
    }

    let newUser = {
      email: email,
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName
    }

    const userCollection = await users();
    const insertedInfo = await userCollection.insertOne(newUser);
    if (!insertedInfo.insertedId) throw "Error: insert failed.";

    return await this.getUserById(insertedInfo.insertedId.toString());
  },

  async getUserById(id) {
    try {
      id = validation.checkId(id);
    } catch (e) {
      throw `Error: ${e}`;
    }

    const userCollection = await users();
    const userInfo = await userCollection.findOne({ _id: new ObjectId(id) });
    if (!userInfo) throw `Error: no user found with id ${id}`;
    userInfo._id = userInfo._id.toString();
    return userInfo;
  }

};

export default exportedMethods;
