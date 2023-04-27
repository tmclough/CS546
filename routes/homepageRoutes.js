import { Router } from "express";
const router = Router();
import { postData } from "../data/index.js";
import validation from "../validation.js";

router.route("/").get((req, res) => {
  res.redirect("/homepage");
});
router
  .route("/homepage")
  .get(async (req, res) => {
    try {
      const postList = await postData.getAllPosts();
      res.render("users/homepage", {
        posts: postList,
        cssFile: "/public/css/homepage.css",
        jsFile: "/public/js/homepage.js",
        userLogin: req.session.user ? false : true,
      });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .post(async (req, res) => {
    let tags = req.body.tagSelect;
    let searchText = req.body.searchText;


    if (typeof tags === "string") {
      tags = [tags];
    }

    let postArr = [];

    if (!tags || tags.length === 0) {
      postArr = postArr;
    } else {
      for (let i = 0; i < tags.length; i++) {
        const posts = await postData.getPostsByTag(tags[i]);
        if (posts && posts.length > 0) {
          postArr.push(posts);
        }
      }
    }

    if (searchText && searchText.trim() !== "") {
      const posts = await postData.getPostsByName(searchText.trim());
      if (posts && posts.length > 0) {
        postArr.push(posts);
      } else {
        postArr = postArr;
      }
    } else {
      postArr = postArr;
    }
    if (searchText && searchText.trim() !== "") {
      const posts = await postData.getPostsByDesciption(searchText.trim());
      if (posts && posts.length > 0) {
        postArr.push(posts);
      } else {
        postArr = postArr;
      }
    } else {
      postArr = postArr;
    }

    postArr = postArr.flat(100);
    res.render("users/homepage", {
      posts: postArr,
      cssFile: "/public/css/homepage.css",
      jsFile: "/public/js/homepage.js",
    });
  });

router.route("/logout").get(async (req, res) => {
  req.session.destroy();
  res.redirect("/homepage");
});

export default router;
