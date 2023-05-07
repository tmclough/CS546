import { Router } from "express";
const router = Router();
import { postData } from "../data/index.js";
import { userData } from "../data/index.js";
import { commentData } from "../data/index.js";
import validation from "../validation.js";
import { locations } from "../validation.js";
import { uploadImages } from "../imageUploadConfig.js";
import xss from "xss";

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
      postInfo.itemName = xss(postInfo.itemName);
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
      postInfo.description = xss(postInfo.description);
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
      postInfo.location = xss(postInfo.location);
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
      postInfo.tagSelect = postInfo.tagSelect.map((i) => {
        return xss(i);
      });
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
      return res.status(400).render("posts/addPost", {
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
        res.status(400).render({ error: "Add post failed", errorCode: 400 });
      }
    } catch (e) {
      res.status(500).render("error/errorPage", {
        error: "Internal Server Error",
        errorCode: 500,
      });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    let postId;
    try {
      postId = validation.checkId(xss(req.params.id), "postId");
    } catch (e) {
      return res
        .status(400)
        .render("error/errorPage", { error: e, errorCode: 400 });
    }

    if (!req.session.user)
      return res.status(400).render("error/errorPage", {
        error: "Error: User not logged in",
        errorCode: 400,
      });

    try {
      const post = await postData.getPostById(postId);
      const userInfo = await userData.getUserById(xss(req.session.user._id));
      let isOwnerOfPost = post.userId === userInfo._id;

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

      let currentUserInfo = req.session.user;

      let hasComments = true;
      if (post.comments.length === 0) {
        hasComments = false;
      }

      let isClaimed = false;
      if (post.claimed === true) {
        isClaimed = true;
      }

      res.render("posts/viewPost", {
        title: "View Post",
        cssFile: "/public/css/viewPost.css",
        jsFile: "/public/js/viewPost.js",
        post: post,
        userInfo: userInfo,
        userLogin: req.session.user ? false : true,
        isOwnerOfPost: isOwnerOfPost,
        currentUserInfo: req.session.user,
        hasComments: hasComments,
        isClaimed: isClaimed,
      });
    } catch (e) {
      res.status(500).render("error/errorPage", {
        error: "Internal Server Error",
        errorCode: 500,
      });
    }
  })
  .delete(async (req, res) => {
    let id;
    try {
      id = validation.checkId(xss(req.params.id), "postId");
    } catch (e) {
      return res
        .status(400)
        .render("error/errorPage", { error: e, errorCode: 400 });
    }

    try {
      const deletedInfo = await postData.deletePost(id);
      if (deletedInfo) {
        res.redirect("/");
      } else {
        return res.status(400).render("error/errorPage", {
          error: "delete failed",
          errorCode: 400,
        });
      }
    } catch (e) {
      res.status(400).render("error/errorPage", { error: e, errorCode: 400 });
    }
  });
router
  .route("/comment/:id")
  .post(async (req, res) => {
    let postId;
    try {
      postId = validation.checkId(xss(req.params.id), "postId");
    } catch (e) {
      return res
        .status(400)
        .render("error/errorPage", { error: e, errorCode: 400 });
    }
    if (!req.session.user._id)
      return res.status(400).render("error/errorPage", {
        error: "Error: User not logged in",
        errorCode: 400,
      });

    try {
      const post = await postData.getPostById(postId);
      const userInfo = await userData.getUserById(req.session.user._id);
      let addCommentInput = xss(req.body.addCommentInput);
      let userId = userInfo._id.toString();
      //let postId = post._id.toString();
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
        return res.status(400).render("posts/viewPost", {
          title: "View Post",
          userLogin: req.session.user ? false : true,
          cssFile: "/public/css/viewPost.css",
          jsFile: "/public/js/viewPost.js",
          commentError: commentError,
        });
      }
      const postWithNewComment = await commentData.addComment(
        userId,
        postId,
        addCommentInput
      );

      res.redirect(`/post/${postId}`);
    } catch (e) {
      res.status(400).render("error/errorPage", { error: e, errorCode: 400 });
    }
  })
  .delete(async (req, res) => {
    let postId;
    try {
      postId = validation.checkId(xss(req.params.id), "postId");
    } catch (e) {
      return res
        .status(400)
        .render("error/errorPage", { error: e, errorCode: 400 });
    }
    try {
      const post = await postData.getPostById(postId);
      //const userInfo = await userData.getUserById(req.session.user._id);
      //let postId = post._id.toString();
      let commentId = xss(req.body.commentId.toString());
      const deletedInfo = await commentData.deleteComment(postId, commentId);
      if (deletedInfo) {
        res.redirect(`/post/${postId}`);
      } else {
        res.status(400).render("error/errorPage", {
          error: "delete failed",
          errorCode: 400,
        });
      }
    } catch (e) {
      res.status(400).render("error/errorPage", { error: e, errorCode: 400 });
    }
  });

router.route("/reply/:id").post(async (req, res) => {
  let postId;
  try {
    postId = validation.checkId(xss(req.params.id));
  } catch (e) {
    return res
      .status(400)
      .render("error/errorPage", { error: e, errorCode: 400 });
  }

  let userId;
  try {
    userId = validation.checkId(xss(req.session.user._id));
  } catch (e) {
    return res
      .status(400)
      .render("error/errorPage", { error: e, errorCode: 400 });
  }

  let commentId;
  try {
    commentId = validation.checkId(xss(req.body.commentId));
  } catch (e) {
    return res
      .status(400)
      .render("error/errorPage", { error: e, errorCode: 400 });
  }

  let commentError = undefined;
  let comment;
  try {
    comment = validation.checkCommentInput(xss(req.body.replyCommentInput));
  } catch (e) {
    commentError = e;
  }
  try {
    const replyInfo = await commentData.replayToComment(
      userId,
      commentId,
      comment
    );
    if (replyInfo) {
      res.redirect(`/post/${postId}`);
    } else {
      res
        .status(400)
        .render("error/errorPage", { error: "reply failed", errorCode: 400 });
    }
  } catch (e) {
    res.status(400).render("error/errorPage", { error: e, errorCode: 400 });
  }
});

//AJAX ROUTES
router.route("/claimed/:id").post(async (req, res) => {
  try {
    const id = validation.checkId(req.params.id);
    const updatedPost = await postData.claimPost(id);

    res.render("partials/post.handlebars", {
      post: updatedPost,
      jsFile: "/public/js/viewPost.js",
      cssFile: "/public/js/viewPost.css",
    });
    // res.render("partials/post", { layout: null, post: updatedData});
  } catch (error) {
    res.status(400).send({ error: error });
  }
});
router.route("/rating/:id").post(async (req, res) => {
  try {
    const postId = validation.checkId(req.params.id);
    const rating = validation.checkRating(req.body.rating);
    const post = await postData.getPostById(postId);
    const userId = validation.checkId(post.userId);
    //  const user = await userData.getUserById(userId);
    const updatedUser = await postData.updateRating(userId, rating);
    res.redirect(`/homepage`);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export default router;
