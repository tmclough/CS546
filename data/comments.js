import { posts } from "../config/mongoCollections.js";
import { postData } from "./index.js";
import { userData } from "./index.js";
import { ObjectId } from "mongodb";
import validation from "../validation.js";

let exportedMethods = {
  async addComment(userId, postId, comment) {
    postId = validation.checkId(postId, "postId");
    userId = validation.checkId(userId, "userId");
    comment = validation.checkCommentInput(comment, "comment");

    const post = await postData.getPostById(postId);
    if (post.claimed) throw "Cannot comment on claimed post";

    const userInfo = await userData.getUserById(userId);
    let username = userInfo.username;

    let newComment = {
      _id: new ObjectId(),
      userId: new ObjectId(userId),
      postId: new ObjectId(postId),
      username: username,
      comment: comment,
      replies: [],
    };

    const postCollection = await posts();
    const postInfo = await postCollection.findOneAndUpdate(
      { _id: new ObjectId(postId) },
      { $push: { comments: newComment } },
      { returnDocument: "after" }
    );
    if (postInfo.lastErrorObject.n === 0) throw "Error: Could not update post";

    return postInfo.value.comments[postInfo.value.comments.length - 1];
  },

  async replyToComment(userId, commentId, comment) {
    commentId = validation.checkId(commentId, "commentId");
    userId = validation.checkId(userId, "userId");
    comment = validation.checkCommentInput(comment, "comment");

    // const commentInfo = await this.getCommentById(commentId);
    // const post = await postData.getPostById(commentInfo.postId);
    // if (post.claimed) throw "Cannot comment on claimed post";
    const userInfo = await userData.getUserById(userId);
    let username = userInfo.username;

    let newReply = {
      _id: new ObjectId(),
      userId: new ObjectId(userId),
      comment: comment,
      username: username,
    };

    const postCollection = await posts();

    const postInfo = await postCollection.findOneAndUpdate(
      { "comments._id": new ObjectId(commentId) },
      { $push: { "comments.$.replies": newReply } },
      { returnDocument: "after" }
    );
    if (postInfo.lastErrorObject.n === 0) throw "Error: Could not update post";

    return postInfo.value;
  },

  async deleteComment(postId, commentId) {
    commentId = validation.checkId(commentId, "commentId");
    postId = validation.checkId(postId, "postId");
    const postCollection = await posts();
    const deletionInfo = await postCollection.findOneAndUpdate(
      { "comments._id": new ObjectId(commentId) },
      { $pull: { comments: { _id: new ObjectId(commentId) } } },
      { returnDocument: "after" }
    );
    if (deletionInfo.lastErrorObject.n === 0) {
      throw "no album exists with specified albumId";
    }
    return { deleted: true };
  },

  // async getAllComments() {

  // },

  async getCommentById(id) {
    id = validation.checkId(id, "id");

    const postCollection = await posts();
    const foundComment = await postCollection.findOne(
      { "comments._id": new ObjectId(id) },
      { projection: { _id: 0, "comments.$": 1 } }
    );
    return foundComment;
  },

  // async getCommentsByPost() {

  // },

  // async getCommentsByUser() {

  // }
};

export default exportedMethods;
