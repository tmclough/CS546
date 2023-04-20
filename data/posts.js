
import {posts} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import validation from '../validation.js';

const exportedMethods = {
    async getAllPosts() {
      const postCollection = await posts();
      return await postCollection.find({}).toArray();
    },
    async getPostById(id) {
      id = validation.checkId(id);
      const postCollection = await posts();
      const post = await postCollection.findOne({_id: new ObjectId(id)});
  
      if (!post) throw 'Error: Post not found';
  
      return post;
    },

    async addPost(title, body) {
      // title = validation.checkString(title, 'Title');
      // body = validation.checkString(body, 'Body');
      // posterId = validation.checkId(posterId, 'Poster ID');
      // if (!Array.isArray(tags)) {
      //   tags = [];
      // } else {
      //   tags = validation.checkStringArray(tags, 'Tags');
      // }
      // const userThatPosted = await userData.getUserById(posterId);
  
      const newPost = {
        title: title,
        body: body,
      };
      const postCollection = await posts();
      const newInsertInformation = await postCollection.insertOne(newPost);
      const newId = newInsertInformation.insertedId;
      return await this.getPostById(newId.toString());
    }
};
export default exportedMethods;