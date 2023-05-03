import { Router } from "express";
const router = Router();
import { ObjectId } from "mongodb";
import { postData, userData } from "../data/index.js";
import validation from "../validation.js";
let searchStr = "";

router.route("/").get((req, res) => {
  res.redirect("/homepage");
});
router
  .route("/homepage")
  .get(async (req, res) => {
    try {
      const postList = await postData.getAllPosts();
      res.render("users/homepage", {
        divClass: "hidden-filter",
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
    let orderByRating = false;
    const postList = await postData.getAllPosts();
    let tags = req.body.tagSelect;
    let tagsFilter = req.body.tagFilter;
    let searchText = req.body.searchText;
    if (!searchText) {
      searchText = searchStr;
    }
    if (typeof tags === "string") {
      tags = [tags];
      let index = tags.indexOf("Rating");
      if (index > -1) {
        orderByRating = true;
        tags.splice(index, 1);
      }
    }

    if (typeof tagsFilter === "string") {
      tagsFilter = [tagsFilter];
      let index = tagsFilter.indexOf("Rating");
      if (index > -1) {
        orderByRating = true;
        tags.splice(index, 1);
      }
    }

    let postArr = [];
    let tagsArr = [];
    if (!tags || tags.length === 0) {
      postArr = postArr;
    } else {
      for (let i = 0; i < tags.length; i++) {
        let posts = await postData.getPostsByTag(tags[i]);
        if (posts && posts.length > 0) {
          tagsArr.push(posts);
        }
      }
    }
    let postArr2 = [];
    if (!tagsFilter || tagsFilter.length === 0) {
      postArr2 = [];
    } else {
      for (let i = 0; i < tagsFilter.length; i++) {
        const posts = await postData.getPostsByTag(tagsFilter[i]);

        if (posts && posts.length > 0) {
          postArr2.push(posts);
        }
      }
    }
    let postUpdated = [];
    postArr2 = postArr2.flat(100);
    if (searchText && searchText.trim() !== "") {
      searchStr = searchText;
      const posts = await postData.getPostsByName(searchText.trim());
      if (posts && posts.length > 0) {
        if (postArr2.length > 0) {
          let postUpdated = posts.filter((post) => {
            let matchingPost = postArr2.find(
              (pst) => pst._id.toString() === post._id.toString()
            );
            return matchingPost ? true : false;
          });

          postArr.push(postUpdated);
        } else {
          postArr.push(posts);
        }
      } else {
        postArr = postArr;
      }
    } else {
      if (postArr.length === 0) {
        postArr = postList;
      }
    }

    if (searchText && searchText.trim() !== "") {
      let posts = await postData.getPostsByDesciption(searchText.trim());
      if (posts && posts.length > 0) {
        if (postArr2.length > 0) {
          let postUpdated = posts.filter((post) => {
            let matchingPost = postArr2.find(
              (pst) => pst._id.toString() === post._id.toString()
            );
            return matchingPost ? true : false;
          });

          postArr.push(postUpdated);
        } else {
          postArr.push(posts);
        }
      } else {
        postArr = postArr;
      }
    } else {
      if (postArr.length === 0) {
        postArr = postList;
      }
    }

    if (searchText && searchText.trim() !== "") {
      try {
        const user = await userData.getUserByName(searchText.trim());
        const posts = await postData.getPostbyUser(user._id.toString());

        if (posts && posts.length > 0) {
          if (postArr2.length > 0) {
            let postUpdated = posts.filter((post) => {
              let matchingPost = postArr2.find(
                (pst) => pst._id.toString() === post._id.toString()
              );
              return matchingPost ? true : false;
            });

            postArr.push(postUpdated);
          } else {
            postArr.push(posts);
          }
        }
      } catch (e) {
        if (postArr.length === 0) {
          postArr = postList;
        }
      }
    }

    postArr = postArr.flat(100);
    tagsArr = tagsArr.flat(100);

    let finalArr = [];
    if (tags && tags.length !== 0) {
      finalArr = tagsArr;
    } else {
      finalArr = postArr;
    }
    if (orderByRating) {
      let ratingArr = [];
      for (let p of finalArr) {
        ratingArr.push(p.rating);
      }
      let resArr = [];
      for (let x = 5; x > 0; x--) {
        for (let a = 0; a < ratingArr.length; a++) {
          if (ratingArr[a] === x) resArr.push(finalArr[a]);
        }
      }
      finalArr = resArr;
    }

    if (tags) {
      res.render("users/homepage", {
        divClass: "hidden-filter",
        posts: finalArr,
        cssFile: "/public/css/homepage.css",
        jsFile: "/public/js/homepage.js",
        searchText: searchText,
      });
    } else {
      res.render("users/homepage", {
        divClass: "search-label",
        posts: finalArr,
        cssFile: "/public/css/homepage.css",
        jsFile: "/public/js/homepage.js",
        searchText: searchText,
      });
    }
  });

router.route("/logout").get(async (req, res) => {
  req.session.destroy();
  res.redirect("/homepage");
});

export default router;
