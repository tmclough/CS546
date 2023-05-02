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

      for (let i = 0; i < post.comments.length; i++) {
        let commentInfo = post.comments[i];
        if (commentInfo.userId.toString() === req.session.user._id.toString()) {
          commentInfo["madeByCurrentUser"] = true;
        } else {
          commentInfo["madeByCurrentUser"] = false;
        }
      }

      post._id = post._id.toString();
      for (let i = 0; i < post.comments.length; i++) {
        post.comments[i]._id = post.comments[i]._id.toString();
      }
      console.log(post);

      let currentUserInfo = req.session.user;

      res.render("posts/viewPost", {
        title: "View Post",
        cssFile: "/public/css/viewPost.css",
        jsFile: "/public/js/viewPost.js",
        post: post,
        userInfo: userInfo,
        userLogin: req.session.user ? false : true,
        isOwnerOfPost: isOwnerOfPost,
        currentUserInfo: currentUserInfo,
      });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  })
  .delete(async (req, res) => {
    const id = validation.checkId(req.params.id);
    try {
      const deletedInfo = await postData.deletePost(id);
      if (deletedInfo) {
        res.redirect("/");
      } else {
        res.status(400).json({ error: "deletion unsuccessful" });
      }
    } catch (e) {
      res.status(400).json({ error: e });
    }
  });
router
  .route("/comment/:id")
  .post(async (req, res) => {
    const id = validation.checkId(req.params.id);
    try {
      const post = await postData.getPostById(id);
      const userInfo = await userData.getUserById(req.session.user._id);
      let addCommentInput = req.body.addCommentInput;
      let userId = userInfo._id.toString();
      let postId = post._id.toString();
      let commentError = undefined;
      try {
        addCommentInput = validation.checkCommentInput(
          addCommentInput,
          "Comment"
        );
      } catch (e) {
        commentError = e;
      }

      if (commentError) {
        res.render("posts/viewPost", {
          title: "View Post",
          userLogin: req.session.user ? false : true,
          cssFile: "/public/css/viewPost.css",
          jsFile: "/public/js/viewPost.js",
          commentError: commentError,
        });
        return;
      }
      const postWithNewComment = await commentData.addComment(
        userId,
        postId,
        addCommentInput
      );
      res.redirect(`/post/${postId}`);
    } catch (e) {
      res.status(400).send({ error: e });
    }
  })
  .delete(async (req, res) => {
    const id = validation.checkId(req.params.id);
    try {
      const post = await postData.getPostById(id);
      const userInfo = await userData.getUserById(req.session.user._id);
      let postId = post._id.toString();
      let commentId = req.body.commentId.toString();
      const deletedInfo = await commentData.deleteComment(postId, commentId);
      if (deletedInfo) {
        res.redirect(`/post/${postId}`);
      } else {
        res.status(400).json({ error: "deletion unsuccessful" });
      }
    } catch (e) {
      res.status(400).send({ error: e });
    }
  });
router
  .route("/reply/:id")
  .post(async (req, res) => {
    const postId = validation.checkId(req.params.id);
    const commentId = validation.checkId(req.body.commentId);
    const userId = validation.checkId(req.session.user._id);
    const comment = validation.checkCommentInput(req.body.replyCommentInput);
    try {
      const replyInfo = await commentData.replayToComment(userId, commentId, comment);
      if (replyInfo) {
        res.redirect(`/post/${postId}`);
      }
      else {
        res.status(400).json({ error: "reply unsuccessful" });
      }
    } catch (e) {
      res.status(400).send({ error: e });
    }

  })
  .delete(async (req, res) => { });

export default router;
