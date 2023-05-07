import { posts, users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import validation from "../validation.js";
import userData from "./users.js";
import postData from "./posts.js";
import { deleteFile } from "../imageUploadConfig.js";

let exportedMethods = {
  async addPost(userId, name, description, imgUrlArray, tags, location) {
    userId = validation.checkId(userId, "userId");
    name = validation.checkItemName(name, "name");
    description = validation.checkDescription(description, "description");
    location = validation.checkLocation(location, "location");
    tags = validation.checkTags(tags, "tags");
    imgUrlArray = validation.checkImgUrlArray(imgUrlArray, "imgUrlArray");

    let date = new Date().toDateString();
    const user = await userData.getUserById(userId);
    if (!user) throw "Error: No user found";

    let newPost = {
      userId: userId,
      name: name,
      description: description,
      imgUrls: imgUrlArray,
      tags: tags,
      location: location,
      postedDate: date,
      comments: [],
      claimed: false,
      username: user.username,
      rating: user.rating,
    };

    const postCollection = await posts();
    const insertedInfo = await postCollection.insertOne(newPost);
    if (!insertedInfo.insertedId) throw "Error: insert Failed";

    return { added: true, id: insertedInfo.insertedId.toString() };
  },

  async deletePost(id) {
    id = validation.checkId(id, "id");
    const postCollection = await posts();
    const deletionInfo = await postCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });
    if (deletionInfo.lastErrorObject.n === 0)
      throw "Error: Could not delete post";
    if (deletionInfo.value.imgUrls) {
      for (let i = 0; i < deletionInfo.value.imgUrls.length; i++) {
        await deleteFile(deletionInfo.value.imgUrls[i]);
      }
    }
    return { deleted: true };
  },

  // async claimPost(id) {
  //   id = validation.checkId(id, "id");

  //   const post = await this.getPostById(id);
  //   if (post.claimed) throw "Error: Post already claimed";

  //   const postCollection = await posts();
  //   const updateInfo = await postCollection.updateOne(
  //     { _id: new ObjectId(id) },
  //     { $set: { claimed: true } }
  //   );
  //   if (!updateInfo.acknowledged) throw "Error: Update failed";
  //   return { updated: true };
  // },

  async getAllPosts() {
    const postCollection = await posts();
    let postList = await postCollection.find({}).toArray();

    //postList = postList.filter((p) => p.claimed === false);

    postList = postList.map((element) => {
      element._id = element._id.toString();
      element.userId = element.userId.toString();
      return element;
    });

    return postList;
  },

  async getPostById(id) {
    id = validation.checkId(id, "id");
    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: new ObjectId(id) });
    if (!post) throw "Error: post not found";
    return post;
  },

  async getPostbyUser(userId) {
    userId = validation.checkId(userId, "userId");
    const postCollection = await posts();
    const post = await postCollection.find({ userId: userId }).toArray();
    if (!post) throw "Error: post not found";
    return post;
  },
  async getPostsByTag(tag) {
    //do validation
    const postCollection = await posts();
    const post = await postCollection.find({ tags: tag }).toArray();
    if (!post) throw "Error: post not found";
    return post;
  },
  async getPostsByName(name) {
    console.log("in getpostbyname");
    name = validation.checkItemName(name, "name");
    const words = name.toLowerCase().trim().split(/\s+/);
    console.log("in getpostbyname");

    const postCollection = await posts();
    console.log("in getpostbyname");
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    const escapedWords = words.map((word) => escapeRegExp(word));
    console.log(escapedWords);
    const regex = new RegExp(escapedWords.join("|"), "i");
    console.log(regex);
    const post = await postCollection.find({ name: regex }).toArray();

    console.log("in getpostbyname");

    if (!post) throw "Error: post not found";
    return post;
  },
  async getPostsByDesciption(description) {
    console.log("in get post by decrip func");
    description = validation.checkDescription(description, "description");
    const words = description.toLowerCase().trim().split(/\s+/);
    const postCollection = await posts();
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    const escapedWords = words.map((word) => escapeRegExp(word));
    // console.log(escapedWords);
    const regex = new RegExp(escapedWords.join("|"), "i");
    console.log(regex);
    const post = await postCollection.find({ description: regex }).toArray();
    console.log(post);
    if (!post) throw "Error: post not found";
    return post;
  },

  // async getPost(id) {
  //   console.log("in getPost")
  //   const postCollection = await posts();
  //   const post = await postCollection.findOne({
  //     description: { _id: id },
  //   });
  //   console.log(post)
  //   if (!post) throw "No such post exists";
  //   return post;
  // },
  async claimPost(id) {
    let post = await postData.getPostById(id);
    // let user = await userData.getUserById(post.userId);

    const postCollection = await posts();

    id = validation.checkId(id, "id");
    const userCollection = await users();
    let updatedUser = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(post.userId) },
      { $inc: { countClaimed: 1 } },
      { returnNewDocument: true }
    );
    let updatedPost = await postCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { claimed: true } },
      { returnNewDocument: true }
    );
    // console.log("after updating post")
    // console.log(updatedPost)

    return updatedPost.value;
  },
  async unclaimPost(id) {
    let post = await postData.getPostById(id);
    // let user = await userData.getUserById(post.userId);

    const postCollection = await posts();

    id = validation.checkId(id, "id");
    const userCollection = await users();
    let updatedUser = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(post.userId) },
      { $inc: { countClaimed: -1 } },
      { returnNewDocument: true }
    );
    let updatedPost = await postCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { claimed: false } },
      { returnNewDocument: true }
    );
    // console.log("after updating post")
    // console.log(updatedPost)

    return updatedPost.value;
  },
  async updatePostRatingsFromUserId(id) {
    console.log("in update post raitngs func");
    id = validation.checkId(id, "id");
    let user = await userData.getUserById(id);
    const postCollection = await posts();

    let postList = await this.getAllPosts();
    for (let post of postList) {
      // console.log("about to update the posts");

      if (post.username === user.username) {
        console.log("about to update the posts");
        console.log(user.rating);

        postCollection.findOneAndUpdate(
          { _id: new ObjectId(post._id) },
          { $set: { rating: user.rating.toString() } },
          { returnNewDocument: true }
        );
      }
    }

    // const updatedPosts = postCollection.update(
    //   { username: user.username },
    //   { $set: { rating: user.rating } },
    //   { returnNewDocument: true }
    // );
    return postList;
  },
  async updateRating(id, inputRating) {
    console.log("in the rataing func");
    id = validation.checkId(id, "id");
    let user = await userData.getUserById(id);
    const userCollection = await users();
    inputRating = parseInt(inputRating);
    let newRating = inputRating;
    if (user.rating !== 0) {
      newRating = (
        (user.rating * (user.countClaimed - 1) + inputRating) /
        user.countClaimed
      ).toFixed(1);
    }
    console.log("about to update rating");
    let updatedUser = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { rating: newRating.toString() } },
      { returnNewDocument: true }
    );
    console.log("about to update post raings");
    let res = await postData.updatePostRatingsFromUserId(id);
    return updatedUser.value;
  },
};

export default exportedMethods;
