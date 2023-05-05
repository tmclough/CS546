import { posts, users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import validation from "../validation.js";
import userData from "./users.js";
import postData from "./posts.js";
// import deleteFile from "../imageUploadConfig.js";
let exportedMethods = {
  async addPost(userId, name, description, imgUrlArray, tags, location) {
    userId = validation.checkId(userId, "userId");
    name = validation.checkItemName(name, "name");
    description = validation.checkDescription(description, "description");
    location = validation.checkLocation(location, "location");
    tags = validation.checkTags(tags, "tags");
    //imgUrl = validation.checkImgUrl(imgUrl, "imgUrl");

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
    // if (deletionInfo.value.imgUrls) {
    //   for (let i = 0; i < deletionInfo.value.imgUrls.length; i++) {
    //     await deleteFile(deletionInfo.value.imgUrls[i]);
    //   }
    // }
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

    postList = postList.filter((p) => p.claimed === false);

    //if (postList.length === 0) throw "Error: No posts in database";
    // postList.map((element) => {
    //     element._id = element._id.toString();
    //     element.userId = element._userId.toString();
    //     return element;
    // })
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
    //do validation
    // const postCollection = await posts();
    // const post = await postCollection.find({ name: name }).toArray();
    // if (!post) throw "Error: post not found";
    // return post;
    name = validation.checkString(name, "name");

    const words = name.toLowerCase().trim().split(/\s+/);

    const postCollection = await posts();
    const post = await postCollection
      .find({
        name: { $regex: words.join("|"), $options: "i" },
      })
      .toArray();
    if (!post) throw "Error: post not found";
    return post;
  },
  async getPostsByDesciption(description) {
    //do validation

    description = validation.checkString(description, "description");

    const words = description.toLowerCase().trim().split(/\s+/);

    const postCollection = await posts();
    const post = await postCollection
      .find({
        description: { $regex: words.join("|"), $options: "i" },
      })
      .toArray();
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
  async updatePostRatingsFromUserId(id) {
    id = validation.checkId(id, "id");
    let user = await userData.getUserById(id);
    const postCollection = await posts();


    let postList = await this.getAllPosts();
    for(let post of postList){
      if (post.username === user.username){
        postCollection.findOneAndUpdate( { _id: post._id},
            { $set: { rating: user.rating } },
            { returnNewDocument: true })
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
    let updatedUser = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { rating: newRating.toString() } },
      { returnNewDocument: true }
    );
      let res = await postData.updatePostRatingsFromUserId(id);
     return updatedUser.value;
  },
};

// async function main() {
//     let post_id = undefined;
//     try {
//         const post = await exportedMethods.addPost("64409ac0c1715ff9f9ab6e12", "Chem Textbook", "brand new chem textbook", [], "Palmer Hall");
//         post_id = post.id;
//         console.log(post);
//     } catch (e) {
//         console.log(e);
//     }

//     try {
//         const allposts = await exportedMethods.getAllPosts();
//         console.log(allposts);
//     } catch (e) {
//         console.log(e);
//     }

//     try {
//         const claim = await exportedMethods.claimPost(post_id);
//         console.log(claim);
//     } catch (e) {
//         console.log(e);
//     }
//     try {
//         const claim = await exportedMethods.claimPost(post_id);
//         console.log(claim);
//     } catch (e) {
//         console.log(e);
//     }
//     try {
//         const postbyID = await exportedMethods.getPostById(post_id);
//         console.log(postbyID);
//     } catch (e) {
//         console.log(e);
//     }

//     try {
//         const postbyuser = await exportedMethods.getPostbyUser("64409ac0c1715ff9f9ab6e12");
//         console.log(postbyuser);
//     } catch (e) {
//         console.log(e);
//     }

//     try {
//         const del = await exportedMethods.deletePost(post_id);
//         console.log(del);
//     } catch (e) {
//         console.log(e);
//     }

//     try {
//         const allposts = await exportedMethods.getAllPosts();
//         console.log(allposts);
//     } catch (e) {
//         console.log(e);
//     }

// }

// main();

export default exportedMethods;
