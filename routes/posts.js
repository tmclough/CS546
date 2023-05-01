import { Router } from "express";
const router = Router();
import { postData } from "../data/index.js";
import { userData } from "../data/index.js";
import { commentData } from "../data/index.js";
import validation from "../validation.js";
import { locations } from "../validation.js";
import { uploadImages } from "../imageUploadConfig.js";

router
  .route("/")
  .get(async (req, res) => {
    res.render("posts/addPost", {
      title: "Add Post",
      cssFile: "/public/css/addPost.css",
      jsFile: "/public/js/addPost.js",
      userLogin: req.session.user ? false : true,
      locations: locations,
    });
  })
  .post(uploadImages, async (req, res) => {
    let postInfo = req.body;
    let filesInfo = req.files;
    let hasError = false;

    let userError;
    if (!req.session.user) {
      hasError = true;
      userError = "Error: no user signed in";
    }

    let itemNameError;
    try {
      postInfo.itemName = validation.checkItemName(
        postInfo.itemName,
        "itemName"
      );
    } catch (e) {
      hasError = true;
      itemNameError = e;
    }

    let descriptionError;
    try {
      postInfo.description = validation.checkDescription(
        postInfo.description,
        "description"
      );
    } catch (e) {
      hasError = true;
      descriptionError = e;
    }

    let locationError;
    try {
      postInfo.location = validation.checkLocation(
        postInfo.location,
        "location"
      );
    } catch (e) {
      hasError = true;
      locationError = e;
    }

    let tagsError;
    try {
      postInfo.tagSelect = validation.checkTags(postInfo.tagSelect, "tags");
    } catch (e) {
      hasError = true;
      tagsError = e;
    }

    let imageUploadError;
    let imageError;
    if (req.uploadError) {
      hasError = true;
      imageUploadError = req.uploadError.errorMessage;
    } else {
      if (!filesInfo || filesInfo.length === 0) {
        hasError = true;
        imageError = "Error: no file provided";
      }
    }

    if (hasError) {
      return res.render("posts/addPost", {
        title: "Add Post",
        cssFile: "/public/css/addPost.css",
        jsFile: "/public/js/addPost.js",
        userLogin: req.session.user ? false : true,
        locations: locations,
        userError,
        itemNameError,
        descriptionError,
        locationError,
        tagsError,
        imageError,
        imageUploadError,
      });
    }

    let imagesUrlArray = [];
    for (let i = 0; i < filesInfo.length; i++) {
      imagesUrlArray.push(filesInfo[i].location);
    }
    try {
      const post = await postData.addPost(
        req.session.user._id,
        postInfo.itemName,
        postInfo.description,
        imagesUrlArray,
        postInfo.tagSelect,
        postInfo.location
      );
      if (post) {
        res.redirect("/homepage");
      } else {
        res.send({ error: "something happend" });
      }
    } catch (e) {
      res.status(500).send({ error: e });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const id = validation.checkId(req.params.id);

    try {
      const post = await postData.getPostById(id);
      const userInfo = await userData.getUserById(req.session.user._id);
      let isOwnerOfPost = false;
      if (post.userId === userInfo._id) {
        isOwnerOfPost = true;
      }
      console.log(post);
      console.log(userInfo);
      console.log(isOwnerOfPost);

      let isOwnerOfComment = true;
      let commentsMadeByCurrentUser = [];
      //we should make comments into an array of objects instead:
      //comments: [{userId: userId, username: username, comment: comment}]
      // for (let i = 0; i < post.comments.length; i++) {
      //    let commentInfo = post.comments[i];
      //    if (commentInfo.userId === req.session.user._id) {
      //        commentsMadeByCurrentUser.push(true);
      //    }
      //    else {
      //        commentsMadeByCurrentUser.push(false);
      //    }
      // }
      res.render("posts/viewPost", {
        title: "View Post",
        cssFile: "/public/css/viewPost.css",
        jsFile: "/public/js/viewPost.js",
        post: post,
        userInfo: userInfo,
        userLogin: req.session.user ? false : true,
        isOwnerOfPost: isOwnerOfPost,
      });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  })
  .post(async (req, res) => {
    const id = validation.checkId(req.params.id);
    try {
      const post = await postData.getPostById(id);
      const userInfo = await userData.getUserById(req.session.user._id);
      const addCommentInput = req.body.addCommentInput;
      let userId = userInfo._id.toString();
      let postId = post._id.toString();
      const postWithNewComment = await commentData.addComment(
        userId,
        postId,
        addCommentInput
      );
    } catch (e) {
      res.status(400).send({ error: e });
    }
  })
  .delete(async (req, res) => {});

export default router;
