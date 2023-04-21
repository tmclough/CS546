import { posts } from "../config/mongoCollections.js";
import { postData } from "./index.js";
import { ObjectId } from "mongodb";
import validation from "../validation.js";
import { dbConnection, closeConnection } from "../config/mongoConnection.js";

let exportedMethods = {
    async addComment(userId, postId, comment) {
        postId = validation.checkId(postId, "postId");
        userId = validation.checkId(userId, "userId");
        comment = validation.checkString(comment, "comment");

        const post = await postData.getPostById(postId);
        if (post.claimed) throw "Cannot comment on claimed post";

        let newComment = {
            _id: new ObjectId(),
            userId: new ObjectId(userId),
            postId: new ObjectId(postId),
            comment: comment,
            replies: []
        }

        const postCollection = await posts();
        const postInfo = await postCollection.findOneAndUpdate({ _id: new ObjectId(postId) }, { $push: { comments: newComment } });
        if (postInfo.lastErrorObject.n === 0) throw "Error: Could not update post";

        return await postInfo.value;
    },

    async replayToComment(userId, commentId, comment) {
        commentId = validation.checkId(commentId, "commentId");
        userId = validation.checkId(userId, "userId");
        comment = validation.checkString(comment, "comment");

        // const commentInfo = await this.getCommentById(commentId);
        // const post = await postData.getPostById(commentInfo.postId);
        // if (post.claimed) throw "Cannot comment on claimed post";

        let newReply = {
            _id: new ObjectId(),
            userId: new ObjectId(userId),
            comment: comment,
        }

        const postCollection = await posts();

        const postInfo = await postCollection.findOneAndUpdate({ 'comments._id': new ObjectId(commentId) }, { $push: { 'comments.$.replies': newReply } });
        if (postInfo.lastErrorObject.n === 0) throw "Error: Could not update post";

        return await postInfo.value;

    },

    // async deleteComment() {

    // },

    // async getAllComments() {

    // },

    async getCommentById(id) {
        id = validation.checkId(id, "id");

        const postCollection = await posts();
        const foundComment = await postCollection.findOne(
            { 'comments._id': new ObjectId(id) },
            { projection: { _id: 0, 'comments.$': 1 } }
        )
        return foundComment;
    },

    // async getCommentsByPost() {

    // },

    // async getCommentsByUser() {

    // }

};




export default exportedMethods;