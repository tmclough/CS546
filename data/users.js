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
  }
};

export default exportedMethods;
