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
    let searchText = req.body.searchText;
    if (!searchText) {
      searchText = searchStr;
    }
    searchText = validation.checkSearchText(searchText, "searchText");

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
    //by name
    if (searchText && searchText.trim() !== "") {
      searchStr = searchText;
      // console.log("before post by name");
      const posts = await postData.getPostsByName(searchText.trim());
      // console.log("gets in this!!!");

      if (posts && posts.length > 0) {
        // console.log("gets in this");
        console.log("shoudlnt be here");
        if (postArr2.length > 0) {
          let postUpdated = posts.filter((post) => {
            let matchingPost = postArr2.find(
              (pst) => pst._id.toString() === post._id.toString()
            );
            return matchingPost ? true : false;
          });
          // console.log("gets in this");

          postArr.push(postUpdated);
        } else {
          postArr.push(posts);
        }
      } else {
        postArr = postArr;
      }
    } else {
      console.log("shouldnt be here2");
      if (postArr.length === 0) {
        postArr = postList;
      }
    }
    //by description
    if (searchText && searchText.trim() !== "") {
      console.log("in search by description");
      console.log(searchText);
      let posts = await postData.getPostsByDesciption(searchText.trim());
      console.log(posts);
      console.log("after getting the posts");
      if (posts && posts.length > 0) {
        console.log("should be in this");
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
          console.log("postarr after pushing posts by description:");
          console.log(postArr);
        }
      } else {
        postArr = postArr;
      }
    } else {
      console.log("shouldnt");
      if (postArr.length === 0) {
        postArr = postList;
      }
    }
    //by name
    if (searchText && searchText.trim() !== "") {
      try {
        const user = await userData.getUserByName(searchText.trim());
        const posts = await postData.getPostbyUser(user._id.toString());

        if (posts && posts.length > 0) {
          console.log("shouldnt for lightly");
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
      console.log("shouldnt");
      if (postArr.length === 0) {
        postArr = postList;
      }
    }

    // {
    //   if (postArr.length === 0) {
    //     postArr = postList;
    //   }

    // if (e === "Error: user not found") {
    //   postArr = postArr;
    // }
    //   }
    // }

    postArr = postArr.flat(100);
    console.log("postArr");
    console.log(postArr);
    tagsArr = tagsArr.flat(100);

    let finalArr = [];
    if (tags && tags.length !== 0) {
      finalArr = tagsArr;
    } else {
      console.log("where i should be");
      finalArr = postArr;
      console.log(finalArr);
    }
    if (orderByRating) {
      console.log("in order by raitn");
      let ratingArr = [];
      for (let p of finalArr) {
        ratingArr.push(p.rating);
      }
      console.log(`ratingArr: ${ratingArr}`);
      let resArr = [];
      for (let x = 5.0; x >= 0; x -= 0.1) {
        for (let a = 0; a < ratingArr.length; a++) {
          console.log("-------");
          console.log(parseFloat(ratingArr[a]).toFixed(1));
          console.log(x.toFixed(1));
          console.log("-------");

          if (
            parseFloat(ratingArr[a]).toFixed(1) === parseFloat(x).toFixed(1)
          ) {
            console.log("getting in this push");
            resArr.push(finalArr[a]);
          }
        }
      }

      console.log("resarr:");
      console.log(resArr);
      finalArr = resArr;
      console.log(`final ARr: ${finalArr}`);
    }

    if (tags) {
      res.render("users/homepage", {
        divClass: "hidden-filter",
        posts: finalArr,
        cssFile: "/public/css/homepage.css",
        jsFile: "/public/js/homepage.js",
        searchText: searchText,
        userLogin: req.session.user ? false : true,
      });
    } else {
      res.render("users/homepage", {
        divClass: "search-label",
        posts: finalArr,
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
