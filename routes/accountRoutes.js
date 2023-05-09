import { Router } from "express";
const router = Router();
import { userData } from "../data/index.js";
import { postData } from "../data/index.js";
import validation from "../validation.js";
import xss from "xss";

router.route("/").get(async (req, res) => {
  if (!req.session.user) {
    res.status(400).render("error/errorPage", {
      error: "Error: user not signed in",
      errorCode: 400,
    });
  }
  try {
    const posts = await postData.getPostbyUser(xss(req.session.user._id));
    const userInfo = await userData.getUserById(xss(req.session.user._id));
    // let divClass = "hiddenDiv"
    if (posts[0].userId === req.session.user._id) {
      res.render("users/account", {
        title: "Account",
        userLogin: req.session.user ? false : true,
        cssFile: "/public/css/account.css",
        jsFile: "/public/js/account.js",
        divClass: "accept-reject-btns",
        posts,
        userInfo,
      });
    } else {
      res.render("users/account", {
        title: "Account",
        userLogin: req.session.user ? false : true,
        cssFile: "/public/css/account.css",
        jsFile: "/public/js/account.js",
        divClass: "`hiddenDiv`",
        posts,
        userInfo,
      });
    }
  } catch (e) {
    res.status(500).render("error/errorPage", { error: e, errorCode: 500 });
  }
});

router.route("/accept/claim/:id").get(async (req, res) => {
  if (!req.session.user) {
    res.status(400).render("error/errorPage", {
      error: "Error: user not signed in",
      errorCode: 400,
    });
  }
  let id;
  try {
    id = validation.checkId(xss(req.params.id), "postId");
  } catch (e) {
    return res
      .status(400)
      .render("error/errorPage", { error: e, errorCode: 400 });
  }
  try {
    const postInfo = await postData.getPostById(id);
    if (!postInfo.claimed)
      res.status(400).render("error/errorPage", {
        error: "Error: post hasn't been claimed",
        errorCode: 400,
      });
    const deletedInfo = await postData.deletePost(id);
    if (deletedInfo) {
      res.redirect("/account");
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
router.route("/reject/claim/:id").get(async (req, res) => {
  if (!req.session.user) {
    res.status(400).render("error/errorPage", {
      error: "Error: user not signed in",
      errorCode: 400,
    });
  }
  let id;
  try {
    id = validation.checkId(xss(req.params.id), "postId");
  } catch (e) {
    return res
      .status(400)
      .render("error/errorPage", { error: e, errorCode: 400 });
  }

  try {
    const postInfo = await postData.getPostById(id);
    if (!postInfo.claimed)
      res.status(400).render("error/errorPage", {
        error: "Error: post hasn't been claimed",
        errorCode: 400,
      });
    const unclaimedInfo = await postData.unclaimPost(id);
    if (unclaimedInfo) {
      res.redirect("/account");
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

export default router;
