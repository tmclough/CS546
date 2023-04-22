import { posts } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import validation from "../validation.js";

let exportedMethods = {
  async addPost(userId, name, description, tags = [], location) {
    userId = validation.checkId(userId, "userId");
    name = validation.checkString(name, "name");
    description = validation.checkString(description, "description");
    location = validation.checkLocation(location, "location");
    if (tags.length !== 0) {
      tags = validation.checkStringArray(tags, "tags");
    }

    let date = new Date().toDateString();
    let newPost = {
      userId: userId,
      name: name,
      description: description,
      tags: tags,
      location: location,
      postedDate: date,
      comments: [],
      rating: 0,
      claimed: false,
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

    return { deleted: true };
  },

  async claimPost(id) {
    id = validation.checkId(id, "id");

    const post = await this.getPostById(id);
    if (post.claimed) throw "Error: Post already claimed";

    const postCollection = await posts();
    const updateInfo = await postCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { claimed: true } }
    );
    if (!updateInfo.acknowledged) throw "Error: Update failed";
    return { updated: true };
  },

  async getAllPosts() {
    const postCollection = await posts();
    const postList = await postCollection.find({}).toArray();
    if (postList.length === 0) throw "Error: No posts in database";
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
