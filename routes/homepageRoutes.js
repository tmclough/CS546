import { Router } from "express";
const router = Router();
import { ObjectId } from "mongodb";
import { postData, userData } from "../data/index.js";
import validation from "../validation.js";
import xss from "xss";
let searchStr = "";

router.route("/").get((req, res) => {
  res.redirect("/homepage");
});
router
  .route("/homepage")
  .get(async (req, res) => {
    let userInfo = req.session.user;
    try {
      const postList = await postData.getAllPosts();
      if (req.session.fromAddPost === true) {
        req.session.fromAddPost = false;
        res.render("users/homepage", {
          title: "Homepage",
          alertClass: "alertShowing",
          divClass: "hidden-filter",
          posts: postList,
          cssFile: "/public/css/homepage.css",
          jsFile: "/public/js/homepage.js",
          userLogin: req.session.user ? false : true,
          userInfo: userInfo,
        });
      } else {
        req.session.fromAddPost = false;

        res.render("users/homepage", {
          title: "Homepage",
          alertClass: "alertHidden",
          divClass: "hidden-filter",
          posts: postList,
          cssFile: "/public/css/homepage.css",
          jsFile: "/public/js/homepage.js",
          userLogin: req.session.user ? false : true,
          userInfo: userInfo,
        });
      }
    } catch (e) {
      res.status(500).render("error/errorPage", { error: e, errorCode: 500 });
    }
  })
  .post(async (req, res) => {
    //Need to do input validation

    let orderByRating = false;
    const postList = await postData.getAllPosts();
    let tags = req.body.tagSelect;

    //tags = validation.checkTags(tags, "tags");
    let tagsFilter = req.body.tagFilter;
    // tagsFilter = validation.checkTags(tagsFilter, "tagsFilter");
    let searchText = xss(req.body.searchText);

    if (!searchText) {
      searchText = searchStr;
    }
    searchText = validation.checkSearchText(searchText, "searchText");

    if (tags && tags.length > 0) {
      if (typeof tags === "string") {
        tags = [tags];
      }
      tags = tags.map((i) => {
        return xss(i);
      });
      let index = tags.indexOf("Rating");
      if (index > -1) {
        orderByRating = true;
        tags.splice(index, 1);
      }
    }
    if (typeof tagsFilter === "string" && tagsFilter.length > 0) {
      tagsFilter = [tagsFilter];
      tagsFilter = tagsFilter.map((i) => {
        return xss(i);
      });
      let index = tagsFilter.indexOf("Rating");
      if (index > -1) {
        orderByRating = true;
        tagsFilter.splice(index, 1);
      }
    }

    let postArr = [];
    let tagsArr = [];

    if (!tags || tags.length === 0) {
      postArr = postArr;
    } else {
      tags = tags.flat(100);
      tags = validation.checkTags(tags, "tags");
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
      tagsFilter = validation.checkTags(tagsFilter, "tagsFilter");
      for (let i = 0; i < tagsFilter.length; i++) {
        const posts = await postData.getPostsByTag(tagsFilter[i]);

        if (posts && posts.length > 0) {
          postArr2.push(posts);
        }
      }
    }

    let postUpdated = [];
    postArr2 = postArr2.flat(100);

    if (!tags) {
      //by name
      if (
        searchText &&
        searchText.trim() !== "" &&
        searchText.trim().length > 1
      ) {
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
          postArr = postArr;
        }
      }
      //by description
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
          postArr = postArr;
        }
      }
      //by username
      if (
        searchText &&
        searchText.trim() !== "" &&
        searchText.trim().length > 1
      ) {
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
          } else {
            postArr = postArr;
          }
        } catch (e) {
          if (postArr.length === 0) {
            postArr = postArr;
          }
        }
      } else {
        if (postArr.length === 0) {
          postArr = postArr;
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
      if (finalArr.length === 0) {
        finalArr = postList;
      }

      let ratingArr = [];
      for (let p of finalArr) {
        ratingArr.push(p.rating);
      }
      let resArr = [];
      for (let x = 5.0; x >= 0; x -= 0.1) {
        for (let a = 0; a < ratingArr.length; a++) {
          if (
            parseFloat(ratingArr[a]).toFixed(1) === parseFloat(x).toFixed(1)
          ) {
            resArr.push(finalArr[a]);
          }
        }
      }

      finalArr = resArr;
    }
    let uniqueArr = [];
    let uniquePosts = {};
    for (let x in finalArr) {
      uniquePosts[finalArr[x]._id] = finalArr[x];
    }
    for (let i in uniquePosts) {
      uniqueArr.push(uniquePosts[i]);
    }

    if (tags) {
      res.render("users/homepage", {
        title: "Homepage",
        alertClass: "alertHidden",
        divClass: "hidden-filter",
        posts: uniqueArr,
        cssFile: "/public/css/homepage.css",
        jsFile: "/public/js/homepage.js",
        searchText: searchText,
        userLogin: req.session.user ? false : true,
      });
    } else {
      res.render("users/homepage", {
        title: "Homepage",
        alertClass: "alertHidden",
        divClass: "search-label",
        posts: uniqueArr,
        cssFile: "/public/css/homepage.css",
        jsFile: "/public/js/homepage.js",
        searchText: searchText,
        userLogin: req.session.user ? false : true,
      });
    }
  });

router.route("/logout").get(async (req, res) => {
  req.session.destroy();
  res.redirect("/homepage");
});

export default router;
